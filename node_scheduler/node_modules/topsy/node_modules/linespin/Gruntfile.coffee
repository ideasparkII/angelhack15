module.exports = (grunt) ->
  grunt.initConfig

    coffee:
      compile:
        options:
          bare: true
        files:
          'lib/color.js': 'src/color.coffee'
          'lib/linespin.js': 'src/linespin.coffee'
          'src/examples/linespin_example.js': 'src/examples/linespin_example.coffee'

  grunt.loadNpmTasks 'grunt-contrib-coffee'

  grunt.registerTask 'default', ['coffee']
