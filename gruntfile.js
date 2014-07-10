module.exports = function(grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  var config = {
    pkg : grunt.file.readJSON('package.json'),

    banner: '/*!\n' +
            ' * Postach.io Styleguide v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * http://<%= pkg.homepage %>/\n' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' */\n',

    autoprefixer: {
      options: {
        browsers: [
          '> 1%',
          'last 2 versions',
          'Firefox ESR',
          'Opera 12.1'
        ]
      },
      css: {
        src: 'dist/*.css'
      },
      docs: {
        src: 'docs/css/*.css'
      }
    },

    browserSync: {
      dev: {
        options: {
          server: {
            baseDir: "./"
          },
          watchTask: true,
          open: false,
          debounce: 800,
          scrollProportionally: false
        },
        bsFiles: {
          src: [
            'src/**/*.html',
            'src/**/*.less',
            'src/**/*.js'
          ]
        },
      }
    },

    clean: {
      dist: {
        src: ["dist/*"]
      }
    },

    cssmin: {
      options: {
        banner: '<%= banner %>'
      },
      css: {
        files: {
          "dist/postachio.min.css": "dist/postachio.css",
        }
      }
    },

    htmlbuild: {
      docs:{
        src: 'src/_docs/templates/base/index.html',
        dest: 'docs/',
        options: {
          sections: {
            patterns: 'src/_docs/templates/patterns/*.html'
          }
        }
      }
    },

    less : {
      dist: {
        files: {
          "dist/postachio.css": "src/less/postachio.less",
          "docs/css/docs.css": "src/_docs/less/docs.less"
        }
      }
    },

    watch: {
      options: {
        nospawn: true
      },
      dist: {
        files: [
          'src/**/*.less',
          'src/**/*.js'
        ],
        tasks: [
          'clean',
          'less',
          'autoprefixer',
          'cssmin'
        ]
      },
      docs: {
        files: [
          'src/**/*.html',
        ],
        tasks: [
          'htmlbuild:docs'
        ]
      }
    }
  };

  grunt.initConfig(config);

  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-html-build');

  // Load Grunt plugins & tasks
  grunt.registerTask('default', [
    'clean:dist',
    'less',
    'autoprefixer',
    'cssmin',
    'htmlbuild:docs',
    'browserSync',
    'watch'
  ]);
}
