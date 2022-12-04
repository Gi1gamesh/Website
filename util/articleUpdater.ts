import fs from "fs";
import path from 'path'
import matter, { FrontMatterResult } from 'front-matter';

type Attributes = {
    [key: string]: any

}

const config = {
    output: "blogData/article-manifest.json",
    previewOutput: "blogData/preview-manifest.json"
}

const regex = /(?:__|[*#])|\[(.*?)\]\(.*?\)/g;

const getDate = () => new Date().getTime();

const getDescription = (text:string) => {
    

    let description =  text.split('\n').slice(0,150)[0];
    const matches = [...description.matchAll(regex)];
    for(const match of matches)
    {
        const [ full, text ] = match;
        description = description.replace(full,text);
    }

    return description;
}

const arrayProps = ['tags']

const getWordCount = (text:string) => text.split(' ').filter(x => x.length > 0).length

const updateFile = (filePath:string, frontMatter:FrontMatterResult<Attributes>) => {

    const props = Object.keys(frontMatter.attributes).map(k => `${k}: ${arrayProps.includes(k) ? `[${frontMatter.attributes[k]}]` : frontMatter.attributes[k]}`).join('\n');
    const newcontent: string = `---\n${props}\n---\n${frontMatter.body}`;
    fs.writeFileSync(filePath, newcontent);
}

const parseFile = (folderPath: string, fileName: string) => {
    const fileFullPath = path.join(folderPath, fileName);
    const fileContents = fs.readFileSync(fileFullPath).toString();

    const frontMatter = matter<Attributes>(fileContents);

    const mutators = [
        {prop: "words", func: getWordCount},
        {prop: "description", func: getDescription},
        {prop: "created", func: getDate},
    ];

    let hasChanges = false;
    for(const mutator of mutators)
    {
        const value = mutator.func(frontMatter.body);
        if(value !=  frontMatter.attributes[frontMatter.attributes[mutator.prop]]){
            frontMatter.attributes[mutator.prop] = value;
            hasChanges = true;
        }
    }

    if(hasChanges){
        updateFile(fileFullPath, frontMatter);
    }

    return {
        ...frontMatter.attributes,
        path: fileName.substring(0, fileName.lastIndexOf('.'))
    }

}

export const updateFiles = (folderPath: string) => {

    const files = fs.readdirSync(folderPath);
    const fullManifest: any[] = [];

    files.forEach(fileName => {
        const fileInfo = parseFile(folderPath, fileName);
        fullManifest.push(fileInfo);
    });

    fullManifest.sort((a, b) => b.created - a.created);
    const outputString = JSON.stringify(fullManifest, null, 0);
    const previewOutputString = JSON.stringify(fullManifest.slice(0, 9), null, 0);

    fs.writeFileSync(config.output, outputString, { encoding: 'utf8', flag: 'w' });
    fs.writeFileSync(config.previewOutput, previewOutputString, { encoding: 'utf8', flag: 'w' });
}