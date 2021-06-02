import * as fs from 'fs';
import path from 'path';


import readline from 'readline';

class SWFile {
  private content: string;
  
  constructor(private readonly fileName: string,
              private readonly targetDir: string) {
  
    this.content = '';
  }
  
  addLine(content: string) {
    this.content += content + '\n';
  }
  
  
  serialize() {
    fs.writeFileSync(this.targetDir + '/' + this.fileName + '.ts', this.content);
  }
}

const generate = async (source: string, targetDir: string): Promise<void> => {
  
  try {
    
    const readInterface = readline.createInterface({
      input: fs.createReadStream(source)
    });
    
    let file: SWFile;
    
    readInterface.on('line', (line: string) => {
      
      line = line.trim();
      line = line.replace('export interface', 'export class');
      
      if (line.indexOf('export type ') === 0) {
        file = new SWFile(line.substr(12, line.indexOf('=') - 12).trim(), targetDir);
      } else if (line.indexOf('export class ') === 0) {
        file = new SWFile(line.substr(13, line.indexOf('{') - 13).trim(), targetDir);
      }
      
      file && file.addLine(line);
      
      if (line.indexOf('}') === 0) {
        file.serialize();
      }
      
    });
    
  } catch (e) {
    console.error(e);
  }
};


const srcFile = path.resolve(process.cwd(), 'src/lib/definitions/workflow.ts');
const targetDir = path.resolve(process.cwd(), 'src/poc/definitions');


generate(srcFile, targetDir);
