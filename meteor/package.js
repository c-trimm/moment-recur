// package metadata file for Meteor.js
'use strict';

var packageName = 'gilbertwat:moment-recur';  // https://atmospherejs.com/momentjs/moment

var packageJson = JSON.parse(Npm.require("fs").readFileSync('package.json'));

Package.describe({
  name: packageName,
  summary: "Depends on official momentjs recurring date plugin for momentjs.",
  version: packageJson.version,
  git: 'https://github.com/gilbertwat/moment-recur.git'
});

Package.onUse(function (api) {
  api.versionsFrom(['METEOR@0.9.0', 'METEOR@1.0']);
  api.use('momentjs:moment@2.10.2');
  api.addFiles([
      'meteor/export.js',
      'moment-recur.js',
      'meteor/clear.js'
  ]);
});

/*
Package.onTest(function (api) {
  api.use(packageName);
  api.use('momentjs:moment');
  api.use('tinytest');

  api.addFiles('meteor/test.js');
});
*/
