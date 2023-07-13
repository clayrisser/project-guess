# project-guess

[![Beerpay](https://beerpay.io/codejamninja/project-guess/badge.svg?style=beer-square)](https://beerpay.io/codejamninja/project-guess)
[![Beerpay](https://beerpay.io/codejamninja/project-guess/make-wish.svg?style=flat-square)](https://beerpay.io/codejamninja/project-guess?focus=wish)
[![GitHub stars](https://img.shields.io/github/stars/codejamninja/project-guess.svg?style=social&label=Stars)](https://github.com/codejamninja/project-guess)

> Guess info about a project

![](assets/project-guess.png)

Please &#9733; this repo if you found it useful &#9733; &#9733; &#9733;


## Features

* Guess author email
* Guess author name
* Guess author url
* Guess project description
* Guess project destination
* Guess project license
* Guess project name
* Guess project repository
* Guess project version
* Guess username


## Installation

```sh
npm install --save project-guess
```


## Dependencies

* [NodeJS](https://nodejs.org)


## Usage

Usage in a yeoman generator

```js
import Generator from 'yeoman-generator';
import { guessProjectName } from 'project-guess';

class extends Generator {
  async prompting() {
    this.context = await yo.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Project Name:',
        default: guessProjectName()
      }
    ]);
  }
}
```


## Support

Submit an [issue](https://github.com/codejamninja/project-guess/issues/new)


## Contributing

Review the [guidelines for contributing](https://github.com/codejamninja/project-guess/blob/master/CONTRIBUTING.md)


## License

[MIT License](https://github.com/codejamninja/project-guess/blob/master/LICENSE)

[Jam Risser](https://jam.codejam.ninja) &copy; 2018


## Changelog

Review the [changelog](https://github.com/codejamninja/project-guess/blob/master/CHANGELOG.md)


## Credits

* [Jam Risser](https://jam.codejam.ninja) - Author


## Support on Beerpay (actually, I drink coffee)

A ridiculous amount of coffee :coffee: :coffee: :coffee: was consumed in the process of building this project.

[Add some fuel](https://beerpay.io/codejamninja/project-guess) if you'd like to keep me going!

[![Beerpay](https://beerpay.io/codejamninja/project-guess/badge.svg?style=beer-square)](https://beerpay.io/codejamninja/project-guess)
[![Beerpay](https://beerpay.io/codejamninja/project-guess/make-wish.svg?style=flat-square)](https://beerpay.io/codejamninja/project-guess?focus=wish)
