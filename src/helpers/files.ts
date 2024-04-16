import * as fs from "fs/promises";
import * as path from "path";

export type File = {
  name: string;
  content: string;
};

export type Folder = {
  name: string;
  files: File[];
  subfolders: Folder[];
};

export async function getFolderFromPath(dirPath: string): Promise<Folder> {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const folder: Folder = {
    name: path.basename(dirPath),
    files: [],
    subfolders: [],
  };

  for (let entry of entries) {
    const entryPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      const subfolder = await getFolderFromPath(entryPath);
      folder.subfolders.push(subfolder);
    } else {
      const content = await fs.readFile(entryPath, "utf8");
      folder.files.push({ name: entry.name, content: content });
    }
  }

  return folder;
}

export function filterRelevantFiles(folder: Folder): Folder {
  const relevantExtensions = new Set([".tsx", ".jsx", ".js", ".ts", ".css"]);
  const filterFiles = (files: File[]) =>
    files.filter((file) => {
      const ext = file.name.substring(file.name.lastIndexOf("."));
      return relevantExtensions.has(ext);
    });

  return {
    ...folder,
    files: filterFiles(folder.files),
    subfolders: folder.subfolders.map((subfolder) =>
      filterRelevantFiles(subfolder)
    ),
  };
}

export function folderToLLMString(folder: Folder): string {
  let result = `Folder: ${folder.name}\n\n`;

  folder.files.forEach((file) => {
    result += `File: ${file.name}\n${file.content}\n\n`;
  });

  folder.subfolders.forEach((subfolder) => {
    result += folderToLLMString(subfolder);
  });

  return result;
}
