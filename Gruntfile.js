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
		src: ['bower_components/dustjs-linkedin/dist/dust-core-2.0.2.js','build/js/templates.js', 'bower_components/video.js/video.js', 'bower_components/videojs-plugin-components/vjsplugincomponents.js', 'bower_components/videojs-overlay-plugin/vjsoverlayplugin.js', 'bower_components/videojs-resolution-switching-plugin/vjsresolutionswitchingplugin.js', 'bower_components/videojs-social-sharing-plugin/vjssocialsharingplugin.js', 'build/js/atlantisTools.js'],
		dest: 'build/js/atlantis.js',
	  },
	},
	uglify: {
	  my_target: {
		files: {
		  'build/js/atlantis.min.js': ['build/js/atlantis.js']
		}
	  }
	},
	compress: {
	  main: {
		options: {
		  mode: 'gzip'
		},
		expand: true,
		cwd: 'build/js/',
		src: ['atlantis.min.js'],
		dest: 'build/js/gzip',
		ext: '.min.js'
	  }
	},
	dustjs: {
	  compile: {
        files: {
          "build/js/templates.js": ["src/templates/**/*.dust"]
        }
      }
	}
  });
  grunt.registerTask('test', ['typescript:test','jasmine']);   
  grunt.registerTask('build', ['typescript:src', 'dustjs', 'concat', 'uglify', 'compress']);
};
