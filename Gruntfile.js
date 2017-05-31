'use strict';
 
module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');    
    grunt.loadNpmTasks('grunt-contrib-imagemin');    
    grunt.initConfig({
        less: {
            development: {
                options: {
                    paths: ["less/"],
                },
                files: {
                    "css/style.css": "less/style.less"
                }
            },
        },
        watch: {
            files: "less/*.less",
            tasks: ["less"]
        },
        imagemin: {
          images: {
              options: {
                  optimizationLevel: 3,
                  progressive: true
              },
              files: [{
                  expand: true,
                  src: ["pics/**/*.{png,jpg,gif,svg}"],
                  dest: "pics-min"
              }]
          }  
        },
    });
     grunt.registerTask('default', ['less:less']);
     grunt.registerTask('default', ['imagemin']);
     grunt.registerTask('default', ['watch']);
};