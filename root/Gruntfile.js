'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    nodeunit: {
      files: ['test/**/*_test.js'],
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['lib/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      },
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib', 'simplemocha']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'simplemocha']
      },
    },
    simplemocha: {
      all: {
        src: ['test/**/*.js'],
        options: {
          globals: ['chai'],
          timeout: 2000,
          ignoreLeaks: false,
          reporter: 'dot'
        }
      }
    },
    coverage: {
      options: {
        thresholds: {
          statements: 90,
          branches: 90,
          lines: 90,
          functions: 90
        },
        dir: 'build/coverage'
      }
    },
    clean: ['coverage'],
    open: {
      cover: {
        path: 'build/coverage/lcov-report/index.html',
        app: 'Google Chrome'
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-istanbul-coverage');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-open');

  // Default task.
  grunt.registerTask('default', ['jshint', 'simplemocha']);
  grunt.registerTask('cover', ['clear', 'clean', 'istanbul', 'open:cover']);
};
