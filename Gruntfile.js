module.exports = function(grunt){

    // Configure tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                
            },
            js: {
                files: {
                    'public/js/scripts.min.js': ['js/master.js']
                }
            }
        },

        watch: {
            js: {
                files: ['js/**/*'],
                tasks: ['js_compile']
            },
            sass: {
                files: ['sass/**/*'],
                tasks: ['sass_compile'],
                options: {
                    interrupt: false,
                    spawn: false
                }
            }
        },

        concat: {
            options: {
                // separator: ';'
            },
            js: {
                src: [
                    "js/test.js",
                    "js/test1.js"
                ],
                dest: 'js/master.js'
            },
            scss: {
                src: [
                    'scss/*.scss', '!scss/master.scss'
                ],
                dest: 'scss/master.scss'
            }
        },

        concurrent: {
            options: {
                logConcurrentOutput: true,
                limit: 10
            },
            monitor: {
                tasks: ["watch:js", "watch:sass"] //removed "server"
            }
        },

        notify: {
            watching: {
                enabled: true,
                massage: 'Watching Files!',
                title: "stevenfrieson.com",
                success: true,
                duration: 1
            },

            sass_compile: {
                options: {
                    enabled: true,
                    message: 'Sass Compiled!',
                    title: "stevenfrieson.com",
                    success: true,
                    duration: 1
                }
            },

            js_compile: {
                options: {
                    enabled: true,
                    message: 'JS Compiled!',
                    title: "stevenfrieson.com",
                    success: true,
                    duration: 1
                }
            },
        },

        sass: {
            expanded: {
                options: {
                    outputStyle: 'expanded',
                    sourcemap: false
                },
                files: {
                    'public/css/style.css': 'scss/master.scss'
                }
            },
            min: {
                options: {
                    outputStyle: 'compressed',
                    courcemap: false
                },
                files: {
                    'public/css/style.min.css': 'scss/master.scss'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-sass');

    grunt.registerTask('js_compile', ['concat:js', 'uglify', 'notify:js_compile']);
    grunt.registerTask('sass_compile', ['concat:scss', 'sass:min', 'notify:sass_compile']);
    grunt.registerTask('monitor', ["concurrent:monitor"]);
};
