import Generator from "yeoman-generator";
import { addGitIgnoreEntries } from "./addGitIgnoreEntries";
import { addReadmeBadges } from "./addReadmeBadges";
import { execEachPackage } from "./execEachPackage";
import { extendPackageJson } from "./extendPackageJson";
import { getGitAuthor } from "./getGitAuthor";
import { getGitRepository } from "./getGitRepository";
import { readPackageJson } from "./readPackageJson";
import { sortPackageJson } from "./sortPackageJson";
import { usesLerna } from "./usesLerna";

export default function(generator: Generator) {
  return {
    getGitAuthor: getGitAuthor.bind(generator),
    getGitRepository: getGitRepository.bind(generator),
    addGitIgnoreEntries: addGitIgnoreEntries.bind(generator),
    addReadmeBadges: addReadmeBadges.bind(generator),
    readPackageJson: readPackageJson.bind(generator),
    extendPackageJson: extendPackageJson.bind(generator),
    sortPackageJson: sortPackageJson.bind(generator),
    usesLerna: usesLerna.bind(generator),
    execEachPackage: execEachPackage.bind(generator)
  };
}
