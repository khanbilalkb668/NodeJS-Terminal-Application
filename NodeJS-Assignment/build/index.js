"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
console.clear();
const options = process.argv;
const command = options[2];
const filepath = options[3] === undefined
    ? process.cwd()
    : path_1.default.resolve(process.cwd(), options[3]);
const destination = options[4] === undefined ? null : path_1.default.resolve(process.cwd(), options[4]);
switch (command) {
    case "-ls":
        listDirContents(filepath);
        break;
    case "-cp":
        if (destination === null) {
            console.error("Please provide a destination path");
            break;
        }
        copyFileToDestination(filepath, destination);
        break;
    case "-mv":
        if (destination === null) {
            console.error("Please provide a destination path");
            break;
        }
        moveFileToDestination(filepath, destination);
        console.log("move");
        break;
    case "-mkdir":
        createDir(filepath);
        break;
    case "-rm":
        removeFile(filepath);
        break;
    case "-pwd":
        console.log(process.cwd());
        break;
    case "-h":
        console.log("Usage: node index.js [command] [filepath] [destination]\n\nCommands:\n\t-ls\t\tList directory contents\n\t-cp\t\tCopy file to destination\n\t-mv\t\tMove file to destination\n\t-mkdir\t\tCreate directory\n\t-rm\t\tRemove file\n\t-pwd\t\tPrint working directory\n\t-h\t\tPrint help");
        break;
}
function listDirContents(filepath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const files = yield fs_1.default.promises.readdir(filepath);
            const detailedFilesPromises = files.map((file) => __awaiter(this, void 0, void 0, function* () {
                let fileDetails = yield fs_1.default.promises.lstat(path_1.default.resolve(filepath, file));
                const { size, birthtime } = fileDetails;
                return { filename: file, "size(KB)": size, created_at: birthtime };
            }));
            const detailedFiles = yield Promise.all(detailedFilesPromises);
            console.table(detailedFiles);
        }
        catch (error) {
            console.error("Error occurred while reading the directory!", error);
        }
    });
}
function copyFileToDestination(filepath, destination) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fs_1.default.promises.copyFile(filepath, destination + "/" + path_1.default.basename(filepath));
            console.log("The file has been copied successfully");
        }
        catch (error) {
            console.error("Error occurred while copying the file!", error);
        }
    });
}
function moveFileToDestination(filepath, destination) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fs_1.default.promises.rename(filepath, destination + "/" + path_1.default.basename(filepath));
            console.log("The file has been moved successfully");
        }
        catch (error) {
            console.error("Error occurred while moving the file!", error);
        }
    });
}
function removeFile(filepath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fs_1.default.promises.unlink(filepath);
            console.log("The file has been removed successfully");
        }
        catch (error) {
            console.error("Error occurred while removing the file!", error);
        }
    });
}
function createDir(filepath) {
    if (!fs_1.default.existsSync(filepath)) {
        fs_1.default.mkdirSync(filepath);
        console.log("The directory has been created successfully");
    }
    else {
        console.log("The directory already exists");
    }
}
//# sourceMappingURL=index.js.map