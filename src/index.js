import 'idempotent-babel-polyfill';
import _ from 'lodash';
import emptyDir from 'empty-dir';
import fs from 'fs-extra';
import gitConfig from 'git-config';
import path from 'path';
import licenseParser from 'license-parser';
import { hostname, userInfo } from 'os';

export function guessAuthorName() {
  let name = null;
  if (fs.existsSync(path.resolve('package.json'))) {
    const author = _.get(require(path.resolve('package.json')), 'author');
    if (_.isString(author)) {
      name = _.trimEnd((author.match(/^[^\<\(]+/g) || []).join(''));
    } else {
      name = _.get(author, 'name');
    }
  }
  if (!_.get(name, 'length')) {
    const config = gitConfig.sync();
    name = config.user ? config.user.name : null;
  }
  if (!_.get(name, 'length')) {
    return _.startCase(guessUsername());
  }
  return name;
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
  if (!_.get(email, 'length')) {
    const config = gitConfig.sync();
    email = config.user ? config.user.email : null;
  }
  if (!_.get(email, 'length')) {
    return defaultEmail || `${userInfo().username}@${hostname()}`;
  }
  return email;
}

export function guessAuthorUrl(username = guessUsername()) {
  let url = '';
  if (fs.existsSync(path.resolve('package.json'))) {
    const author = _.get(require(path.resolve('package.json')), 'author');
    if (_.isString(author)) {
      url = (author.match(/\([^\<\>]+(?=\))/g) || []).join('').substr(1);
    } else {
      url = _.get(author, 'url');
    }
  }
  if (!_.get(url, 'length')) {
    return `https://${username}.com`;
  }
  return url;
}

export function guessProjectDescription(
  defaultDescription = `A project for ${guessProjectName()}`
) {
  let description = null;
  if (fs.existsSync(path.resolve('package.json'))) {
    ({ description } = require(path.resolve('package.json')));
  }
  if (!_.get(description, 'length')) return defaultDescription;
  return description;
}

export function guessProjectLicense(defaultLicense = 'MIT') {
  let license = '';
  if (fs.existsSync(path.resolve('package.json'))) {
    license = _.get(require(path.resolve('package.json')), 'license');
  }
  license = _.get(licenseParser(license), '0', '');
  if (!_.get(license, 'length')) {
    return defaultLicense;
  }
  return license;
}

export function guessProjectName(
  defaultProjectName = `${guessUsername()}s-project`
) {
  let name = null;
  if (fs.existsSync(path.resolve('package.json'))) {
    name = _.get(require(path.resolve('package.json')), 'name');
  }
  if (!_.get(name, 'length')) {
    if (emptyDir.sync(process.cwd()) || fs.existsSync(path.resolve('.git'))) {
      return (process.cwd().match(/[^\/]+$/g) || [defaultProjectName]).join('');
    }
    return defaultProjectName;
  }
  return name;
}

export function guessProjectDestination(name) {
  if (emptyDir.sync(process.cwd()) || fs.existsSync(path.resolve('.git'))) {
    return process.cwd();
  }
  return path.resolve(name);
}

export function guessProjectRepository(
  username = guessUsername(),
  projectName
) {
  if (!projectName) projectName = guessProjectName(`${username}s-project`);
  let repository = '';
  if (fs.existsSync(path.resolve('package.json'))) {
    repository = _.get(require(path.resolve('package.json')), 'repository');
  }
  if (!_.get(repository, 'length')) {
    repository = `https://github.com/${username}/${projectName}`;
  }
  return repository;
}

export function guessProjectVersion(defaultVersion = '0.0.1') {
  let version = '';
  if (fs.existsSync(path.resolve('package.json'))) {
    version = _.get(require(path.resolve('package.json')), 'version');
  }
  if (!_.get(version, 'length')) {
    return defaultVersion;
  }
  return version;
}

export function guessUsername(email = guessAuthorEmail()) {
  let username = '';
  if (fs.existsSync(path.resolve('package.json'))) {
    const pkg = require(path.resolve('package.json'));
    username = (
      (
        _.get(pkg, 'repository.url', pkg.repository) ||
        _.get(pkg, 'homepage.url', pkg.homepage) ||
        ''
      ).match(/github\.com\/[^\/]+/g) || []
    )
      .join('')
      .substr(11);
  }
  if (!_.get(username, 'length') && email) {
    return (email.match(/^[^@]+/g) || []).join('');
  }
  return userInfo().username;
}

export default {
  guessAuthorEmail,
  guessAuthorName,
  guessAuthorUrl,
  guessProjectDescription,
  guessProjectDestination,
  guessProjectLicense,
  guessProjectName,
  guessProjectRepository,
  guessProjectVersion,
  guessUsername
};
