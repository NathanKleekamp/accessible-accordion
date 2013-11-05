module.exports = function(grunt){

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        cssc: {
          build: {
            options: {
              consolidateViaDeclarations: true,
              consolidateViaSelectors: true,
              consolidateMediaQueries: true
            },
            files: {
              'build/css/main.css': 'css/styles.css'
            }
          }
        },

        cssmin: {
          combine: {
            files: {
              'build/css/main.min.css': ['css/normalize.min.css', 'build/css/main.css']
            }
          }
        },

        htmlhint: {
          build: {
            options: {
              'attr-lowercase': true,
              'attr-value-double-quotes': true,
              'doctype-first': true,
              'doctype-html5': true,
              'head-script-disabled': true,
              'id-class-value': true,
              'id-unique': true,
              'img-alt-require': true,
              'spec-char-escape': true,
              'src-not-empty': true,
              'style-disabled': true,
              'tag-pair': true,
              'tag-self-close': true,
              'tagname-lowercase': true
            },
            src: ['index.html']
          }
        },

        uglify: {
          build: {
            files: {
              'build/js/main.min.js': ['js/main.js']
            }
          }
        },

        watch: {
          html: {
            files: ['index.html'],
            tasks: ['htmlhint']
          },
          js: {
            files: ['js/main.js'],
            tasks: ['uglify']
          },
          css: {
            files: ['css/*.css'],
            tasks: ['buildcss']
          }
        }
    });

    grunt.registerTask('default', []);
    grunt.registerTask('buildcss', ['cssc', 'cssmin']);

};
