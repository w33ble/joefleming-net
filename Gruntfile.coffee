module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    bower: grunt.file.readJSON 'bower.json'

    uglify:
      modernizr:
        options:
          mangle: false
        src: ['components/modernizr/modernizr.js']
        dest: 'src/files/vendor/modernizr.min.js'
      site:
        src: [
          # 'src/files/vendor/jquery.min.js'
          'src/files/vendor/highlightjs/highlight.pack.js'
          'src/files/js/site.js'
        ]
        dest: 'src/files/js/site.min.js'

    stylus:
      site:
        src: ['src/documents/css/site.css.styl']
        dest: 'src/files/css/site.min.css'

    cssmin:
      normalize:
        src: ['components/normalize-css/normalize.css']
        dest: 'src/files/vendor/normalize.min.css'
      site:
        src: [
          'src/files/vendor/normalize.min.css'
          'src/files/vendor/highlightjs/tomorrow-night.css'
          'src/files/css/site.min.css'
        ]
        dest: 'src/files/css/site.min.css'

    copy:
      components:
        files: [
          {
            src: ['components/jquery/jquery.min.js']
            dest: 'src/files/vendor/'
            expand: true
            flatten: true
            filter: 'isFile'
          }
          {
            src: ['components/highlightjs/highlight.pack.js',
              'components/highlightjs/styles/tomorrow-night.css']
            dest: 'src/files/vendor/highlightjs/'
            expand: true
            flatten: true
            filter: 'isFile'
          }
          {
            cwd: 'components/font-awesome/build/assets/font-awesome/'
            src: ['css/**', 'font/**']
            dest: 'src/files/vendor/font-awesome/'
            expand: true
          }
          {
            src: ['components/semantic-grid/stylesheets/styl/grid.styl']
            dest: 'src/files/vendor/'
            expand: true
            flatten: true
            filter: 'isFile'
          }
        ]

  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-stylus'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'default', ['vendor']

  grunt.registerTask 'vendor', [
    'uglify:modernizr'
    'cssmin:normalize'
    'copy:components'
  ]

  grunt.registerTask 'dist', [
    'vendor'
    'uglify:site'
    'stylus:site'
    'cssmin:site'
  ]

