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
            sass: {
                files: ['sass/**/*'],
                tasks: ['sass_compile'],
                options: {
                  interrupt: false,
                  spawn: false,
                }
            },
            js: {
                files: ['js/**/*'],
                tasks: ['js_compile'],
                options: {
                  interrupt: false,
                  spawn: false,
                }
            },
            html: {
                files: ['html/**/*'],
                tasks: ['html_concat'],
                options: {
                  interrupt: false,
                  spawn: false,
                }
            }
        },

        concat: {
            options: {
                // separator: ';'
            },
            js: {
                src: [
                    "js/*.js", "!js/master.js"
                ],
                dest: 'js/master.js'
            },
            scss: {
                src: [
                    'sass/*.scss', '!sass/master.scss'
                ],
                dest: 'sass/master.scss'
            },
            index: {
                src: [
                    'html/index/*.html'
                ],
                dest: 'public/index.html'
            },
            resume: {
                src: [
                    'html/resume/*.html'
                ],
                dest: 'public/resume.html'
            }
        },

        concurrent: {
            options: {
                logConcurrentOutput: true,
                limit: 10
            },
            monitor: {
                tasks: ["watch:js", "watch:sass", "watch:html"]
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

            html_concat: {
                options: {
                    enabled: true,
                    message: 'HTML Concatonated!',
                    title: "stevenfrieson.com",
                    success: true,
                    duration: 1
                }
            }
        },

        sass: {
            expanded: {
                options: {
                    outputStyle: 'expanded',
                    sourcemap: false
                },
                files: {
                    'public/css/style.css': 'sass/master.scss'
                }
            },
            min: {
                options: {
                    outputStyle: 'compressed',
                    sourcemap: false
                },
                files: {
                    'public/css/style.min.css': 'sass/master.scss'
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
    grunt.registerTask('sass_compile', ['concat:scss', 'sass:expanded', 'sass:min', 'notify:sass_compile']);
    grunt.registerTask('html_concat', ['concat:index', 'concat:resume', 'notify:html_concat']);
    grunt.registerTask('monitor', ["concurrent:monitor"]);
};
