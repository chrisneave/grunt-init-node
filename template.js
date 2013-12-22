/*
 * grunt-init-node
 * https://gruntjs.com/
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Create a Node.js module, including Nodeunit unit or Mocha tests.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '_Project name_ shouldn\'t contain "node" or "js" and should ' +
  'be a unique ID not already in use at search.npmjs.org.';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You should now install project dependencies with _npm ' +
  'install_. After that, you may execute project tasks with _grunt_. For ' +
  'more information about installing and configuring Grunt, please see ' +
  'the Getting Started guide:' +
  '\n\n' +
  'http://gruntjs.com/getting-started';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({type: 'node'}, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('description'),
    init.prompt('version'),
    init.prompt('repository'),
    init.prompt('homepage'),
    init.prompt('bugs'),
    init.prompt('licenses'),
    init.prompt('author_name'),
    init.prompt('author_email'),
    init.prompt('author_url'),
    init.prompt('node_version', '>= 0.8.0'),
    init.prompt('main'),
    init.prompt('npm_test', 'grunt'),
    {
      name: 'travis',
      message: 'Will this project be tested with Travis CI?',
      default: 'Y/n',
      warning: 'If selected, you must enable Travis support for this project in https://travis-ci.org/profile'
    },
  ], function(err, props) {
    props.keywords = [];
    props.devDependencies = {
      'grunt-contrib-jshint': '~0.6.4',
      'grunt-contrib-watch': '~0.5.3',
      'mocha': '~1.16.1',
      'chai': '~1.8.1',
      'istanbul': '~0.1.46',
      'grunt-clear': '~0.2.1',
      'grunt-contrib-clean': '~0.5.0',
      'grunt-open': '~0.2.2',
      'grunt-simple-mocha': '~0.4.0'
    };
    props.travis = /y/i.test(props.travis);

    // Files to copy (and process).
    var files = init.filesToCopy(props);
    if (!props.travis) { delete files['.travis.yml']; }

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file.
    init.writePackageJSON('package.json', props);

    grunt.log.header('Installing packages using npm');
    var exec = require('child_process').exec;
    var cmd = exec('npm install', {}, function(err, stdout, stderr) {
      if (err) {
        grunt.fail.fatal(err);
      } else {
        grunt.log.ok('All done.');
      }

      done();
    });
  });
};
