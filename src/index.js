import _ from 'lodash';
import emptyDir from 'empty-dir';
import fs from 'fs-extra';
import parseGitConfig from 'parse-git-config';
import path from 'path';
import { homedir, hostname, userInfo } from 'os';

export function guessAuthorName() {
  let authorName = null;
  if (fs.existsSync(path.resolve('package.json'))) {
    const author = _.get(require(path.resolve('package.json')), 'author');
    if (_.isString(author)) {
      authorName = _.trimEnd((author.match(/^[^\<\(]+/g) || []).join(''));
    } else {
      authorName = _.get(author, 'name');
    }
  }
  if (!authorName || authorName.length <= 0) {
    const gitConfig = getGitConfig();
    authorName = gitConfig.user ? gitConfig.user.name : null;
  }
  if (!authorName || authorName.length <= 0) {
    return _.startCase(guessUsername());
  }
  return authorName;
}

export function guessAuthorEmail(defaultEmail) {
  let email = null;
  if (fs.existsSync(path.resolve('package.json'))) {
    const author = _.get(require(path.resolve('package.json')), 'author');
    if (_.isString(author)) {
      email = (author.match(/<[^@]+.+(?=>)/g) || []).join('').substr(1);
    } else {
      email = _.get(author, 'email');
    }
  }
  if (!email || email.length <= 0) {
    const gitConfig = getGitConfig();
    email = gitConfig.user ? gitConfig.user.email : null;
  }
  if (!email || email.length <= 0) {
    return defaultEmail || `${userInfo().username}@${hostname()}`;
  }
  return email;
}

export function guessProjectDescription(
  defaultDescription = `A project for ${guessProjectName()}`
) {
  let description = null;
  if (fs.existsSync(path.resolve('package.json'))) {
    ({ description } = require(path.resolve('package.json')));
  }
  if (!description || description.length <= 0) return defaultDescription;
  return description;
}

export function guessProjectName(
  defaultProjectName = `${guessUsername()}s-project`
) {
  let projectName = null;
  if (fs.existsSync(path.resolve('package.json'))) {
    projectName = _.get(require(path.resolve('package.json')), 'name');
  }
  if (!projectName || projectName.length <= 0) {
    return (process.cwd().match(/[^\/]+$/g) || [defaultProjectName]).join('');
  }
  return projectName;
}

export function guessProjectDestination(name, destination) {
  if (destination) return path.resolve(destination);
  if (emptyDir.sync(process.cwd()) || fs.existsSync(path.resolve('.git'))) {
    return process.cwd();
  }
  return path.resolve(name);
}

export function guessUsername(email = guessAuthorEmail()) {
  if (email) {
    return (email.match(/^[^@]+/g) || []).join('');
  }
  return userInfo().username;
}

function getGitConfig() {
  return parseGitConfig.sync({
    cwd: '/',
    path: path.resolve(homedir(), '.config/git/config')
  });
}

export default {
  guessAuthorName,
  guessAuthorEmail,
  guessProjectDescription,
  guessProjectName,
  guessProjectDestination,
  guessUsername
};
