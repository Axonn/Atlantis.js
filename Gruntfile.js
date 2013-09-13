'use strict';
module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    watch: {
      options: {
        nospawn: true,
      }
    },
	jasmine: {
      base: {
		  src: "build/js/Atlantis.js",
		  options: {
			specs: "build/test/Atlantis.js",
			vendor: "bower_components/jquery/jquery.min.js",
		  }
	  }
    },
	typescript: {
      src: {
        src: ['src/ts/*.ts'],
        dest: 'build/js/atlantisTools.js',
        options: {
          module: 'amd',
          target: 'es3', 
          base_path: 'src/ts',
          sourcemap: true,
          fullSourceMapPath: true,
          declaration: true,
        }
      },
	  test: {
        src: ['test/*.ts'],
        dest: 'build/test/Atlantis.js',
        options: {
          module: 'amd',
          target: 'es3',
          base_path: 'test',
          sourcemap: true,
          fullSourceMapPath: true,
          declaration: true,
        }
      }
	},
	concat: {
	  options: {
		separator: ';',
	  },
	  dist: {
		src: ['bower_components/dustjs-linkedin/dist/dust-core-2.0.2.js','build/js/templates.js', 'bower_components/video.js/video.js', 'bower_components/videojs-plugin-components/vjsplugincomponents.js', 'bower_components/videojs-google-analytics-plugin/vjsgoogleanalytics.js','bower_components/videojs-overlay-plugin/vjsoverlayplugin.js', 'bower_components/videojs-poster-plugin/vjsposterplugin.js','bower_components/videojs-resolution-switching-plugin/vjsresolutionswitchingplugin.js', 'bower_components/videojs-social-sharing-plugin/vjssocialsharingplugin.js', 'bower_components/jquery.path/jquery.path.js', 'build/js/atlantisTools.js'],
		dest: 'build/js/atlantis.js',
	  },
	},
	uglify: {
	  my_target: {
		files: {
		  'build/js/atlantis.min.js': ['build/js/atlantis.js'],
		}
	  }
	},
	cssmin: {
	  combine: {
		files: {
		  'build/js/atlantisjs.css': ['src/css/atlantisjs.css'],
		}
	  }
	},
	compress: {
	  js: {
		options: {
		  mode: 'gzip'
		},
		expand: true,
		cwd: 'build/js/',
		src: ['atlantis.min.js'],
		dest: 'build/js/gzip',
		ext: '.js'
	  },
	  css: {
		options: {
		  mode: 'gzip'
		},
		expand: true,
		cwd: 'build/js/',
		src: ['atlantisjs.css'],
		dest: 'build/js/gzip',
		ext: '.css'
	  }
	},
	dustjs: {
	  compile: {
        files: {
          "build/js/templates.js": ["src/templates/**/*.dust"]
        }
      }
	},
	copy: {
	  main: {
		files: [
		  {expand: true, cwd: 'src/', src: ['fonts/*'], dest: 'build/js/', filter: 'isFile'}, // includes files in path
		]
	  }
	}
  });
  
  grunt.registerTask('updatebower', function (){
	var version = grunt.file.read("version.txt");
	
  }); 
  grunt.registerTask('test', ['typescript:test','jasmine']);   
  grunt.registerTask('build', ['typescript:src', 'dustjs', 'concat', 'uglify', 'cssmin','copy','compress:js','compress:css']);
};
