import fs from "fs/promises";
import ___path from "path";

export type File = {
  name: string;
  content: string;
};

export type Folder = {
  name: string;
  files: File[];
  subfolders: Folder[];
};

export function traverseFolder(folder: Folder, handler: (file: File) => void) {
  folder.files.forEach(handler);
  folder.subfolders.forEach((subfolder) => traverseFolder(subfolder, handler));
}

export async function getFolderFromPath(dirPath: string): Promise<Folder> {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const folder: Folder = {
    name: ___path.basename(dirPath),
    files: [],
    subfolders: [],
  };

  for (let entry of entries) {
    const entryPath = ___path.join(dirPath, entry.name);
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

export function folderToLLMString(
  folder: Folder,
  basePath: string = ""
): string {
  let result = "";

  // Process each file in the current folder
  folder.files.forEach((file) => {
    // Append the full file path and content to the result string
    result += `File: ${basePath}${folder.name}/${file.name}\n\n${file.content}\n\n`;
  });

  // Recursively process each subfolder
  folder.subfolders.forEach((subfolder) => {
    // Concatenate the current folder's name to the path for deeper nesting
    result += folderToLLMString(subfolder, `${basePath}${folder.name}/`);
  });

  return result;
}
