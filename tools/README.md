# Tooling Architecture

## 1. Downloader
A simple script that downloads the JSON Schema(s) from `https://serverlessworkflow.io/`. Currently, there is only one schema, but the script supports downloading referenced schemas as well for legacy reasons. As it might be useful in the future and doesn't add much complexity, it has been retained.

> *(i) The schema(s) are saved in `src/lib/generated/schema/`, the main one being `workflow.json`.*

## 2. Generating Types
The goal is to automatically generate TypeScript types/interfaces or classes corresponding to the specification's JSON Schema. This step is the trickiest. Its outcome will vary depending on the schema and the library used.

Some libraries considered:
- [dtsgenerator](https://www.npmjs.com/package/dtsgenerator) - Used with the previous version of the spec but is no longer updated and doesn't support `draft/2020-12` schemas. Replacing `$defs` with `definitions` didn't yield convincing results. With the previous version, manual merging of schemas was needed because external `$refs` were not resolved.
- [quicktype](https://www.npmjs.com/package/quicktype) - Despite its popularity, its output was unsatisfactory. Instead of using union types, it merged all properties into one object and made them nullable. While there might be configuration options to address this, it was not explored in depth. Its support for many languages might make it less specialized.
- [json-schema-to-typescript](https://www.npmjs.com/package/json-schema-to-typescript) - Generates a mix of types and interfaces, using unions and intersections. A red flag is the number of open issues, some dating back to 2018. However, it is still maintained.

In the end, `json-schema-to-typescript` was selected. Nevertheless, it has some issues to work around:
- [Issue #613](https://github.com/bcherny/json-schema-to-typescript/issues/613)
- [Issue #193](https://github.com/bcherny/json-schema-to-typescript/issues/193) (from 2018)

To maximize compatibility with `json-schema-to-typescript`, the generator performs a few operations in two phases:

### Phase 1: Embellishing the JSON Schema
To have better control over the generated type names, every object and array of objects in the schema is given a `title` if none is defined. This allows:
1. Avoiding names like `Schema` and `Schema1`
2. Mapping a generated type to its JSON pointer in the schema (see [3. Generating Validators](#3-generating-validators))

The `type: object` is also added when not specified. This doesn't impact type generation but might be useful for strict schema validation.

Theoretically, *Phase 1* doesn't affect the validity of the schema.

> *(i) The resulting schema is saved as `src/lib/generated/schema/__internal_workflow.json` for later use.*

### Phase 2: Mutating the JSON Schema
`json-schema-to-typescript` has limitations, as highlighted in the issues linked above:
- When a property's type is referenced (`$ref`) and also decorated with metadata (e.g., `description`), `json-schema-to-typescript` outputs an additional type instead of using the referenced one. See [Issue #193](https://github.com/bcherny/json-schema-to-typescript/issues/193).
- When an object inherits from another using a reference (`$ref`), the parent is ignored in the generated types. See [Issue #613](https://github.com/bcherny/json-schema-to-typescript/issues/613).
- `unevaluatedProperties` seems to be ignored.

*Phase 2* addresses these limitations by:
- Removing metadata from properties whose type is a reference.
- Replacing `$ref` inheritance with `allOf`
- Replacing `unevaluatedProperties` with `additionalProperties`

The resulting schema is used in-memory to generate the types. The schema produced by *Phase 2* is intrinsically different from the original schema and will produce different validation results if used. **This is why this process is done in two phases instead of one, which would have been more performant.**

After phases 1 & 2, the mutated schema is passed to `json-schema-to-typescript` and the resulting TypeScript declarations are saved to `specification.ts`.

> *(i) The declarations are saved in `src/lib/generated/definitions/specification.ts`.*

## 3. Generating Validators
To validate an object of type `T`, where `T` is not the root object described by the JSON Schema, we need to know the subschema's JSON pointer corresponding to `T`. The exported declarations of the TypeScript file produced in [step 2](#2-generating-types) are extracted using `ts-morph`. *(This is probably overkill; a regex could probably do the trick, but this library might be useful later on.)* For each declaration, the internal JSON Schema produced in [step 2 - Phase 1](#phase-1-embellishing-the-json-schema) is crawled to find the object with the matching title. Then, an object where the keys are the names of the types and the values are their JSON pointers is saved as `validation-pointers.ts`.

> *(i) The validation pointers are saved in `src/lib/generated/validation/validation-pointers.ts`.*

The produced validation pointers are used by the SDK to expose a `validate` function that takes the name of the type to validate and the object to validate:
```typescript
validate('TypeName', value);
```

> *(i) The validation function is located at `src/lib/validation.ts`.*

## 4. Generating Classes
[Generating types](#2-generating-types) is already a great step, but classes have a few advantages we'd like to leverage in an SDK:
- Unlike types, they can be tested at runtime with `instanceof`
- They can carry business logic such as object hydration (for the aforementioned `instanceof` checking), self-validation, default value handling, etc.

The aim is to generate a class for each type/interface generated in the 2nd step that shares the same property signatures. This is achieved by exploiting a TypeScript trick: declaring an internal class and then exposing it as an intersection of its constructor and its associated type (see this [StackOverflow reply](https://stackoverflow.com/questions/54207173/classes-keyof-in-typescript/54207465#54207465)). For instance, if our type is `Foo`, we can mimic a class `FooClass` using the following code:
```typescript
class _FooClass {
  constructor(model?: Partial<Foo>) {
    if (model) Object.assign(this, model);
  }
}

export const FooClass = _FooClass as {
  new(model?: Foo): _FooClass & Foo // aka "the constructor creates an object which is both _FooClass and Foo"
};

const fooInstance = new FooClass();
console.log(fooInstance instanceof FooClass); // true
```

At the moment, classes don't do anything else. Validation, for instance, is called by the builders (next step). In the future, validation will be migrated to the classes, along with recursive hydration and default values handling.

> *(i) The classes are saved in `src/lib/generated/classes/`.*

## 5. Generating Fluent Builders
One feature of the SDK is to expose fluent builders. This feature heavily relies on the builder proxy in `src/lib/builder.ts`. The generic type `Builder<T>` reflects properties of `T` as methods and adds a `build()` method to return the built object. The proxy sets the property value when the corresponding method is called or calls a "building function" when `build()` is called.

The generator iterates over the generated types to:
- Define a "building function" that creates an "instance of the type" (of the class that mimics the type) and validates it.
- Wrap the generic proxy into a specific one. e.g., `export const workflowBuilder = (): Builder<Specification.Workflow> => builder<Specification.Workflow>(buildingFn);`.

At the moment, the "building function" can be extended to include pre-validation code, but this will likely migrate to the class level.

> *(i) The builders are saved in `src/lib/generated/builders/`.*

## Conclusion
With the tooling in place, we can automatically provide the required features of the SDK:
- Type checking
- Validation
- Typed instances
- Fluent builder