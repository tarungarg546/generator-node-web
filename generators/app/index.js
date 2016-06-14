 'use strict';
//Require dependencies
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
console.log(yosay('Hello, and welcome to my fantastic generator . \n Found bug? Send Issue or PR :)'));

module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    // This makes `appname` a required argument.
    this.argument('appname', { type: String, required: true });
    // And you can then access it later on this way; e.g. CamelCased
    this.appname = this.appname;
  },
  //Configurations will be loaded here.
  //Ask for user input
  prompting: function() {
    var done = this.async(); 
    // have Yeoman greet the user
    console.log(this.yeoman);
    var prompts = [{
                      type: 'input',
                      name: 'name',
                      message: 'Your project name :- ',
                      //Defaults to the project's folder name if the input is skipped
                      default: this.appname
                    },{
                      type: 'input',
                      name: 'description',
                      message: 'Your project\'s description :- ',
                      //Defaults to the project's folder name if the input is skipped
                      default: this.appname
                    },{
                      type:'input',
                      name:'github',
                      message:'Github project link :- ',
                      store   : true
                    },{
                      type:"list",
                      name:"ui",
                      choices:["bootstrap","materialize","None"],
                      message:"Select client side library you wanna use :- ",
                      default:"bootstrap",
                      store   : true
                    },{
                      type:'type',
                      name:'mongodb_uri',
                      message:'Enter mongodb url you wants to connect to :- ',
                      store   : true
                    }];

    this.prompt(prompts).then(function(props) {
        this.props=props;

        done();
    }.bind(this));
  },
  writing: {
    //Copy the configuration files
    config: function () {
          this.fs.copyTpl(
              this.templatePath('_package.json'),
              this.destinationPath(this.props.name+'/package.json'), {
                  name: this.props.name,
                  description:this.props.description,
                  github:this.props.github
              }
          );
          this.fs.copyTpl(
              this.templatePath('_bower.json'),
              this.destinationPath(this.props.name+'/bower.json'), {
                  name: this.props.name
              }
          );
          this.fs.copy(
            this.templatePath('bowerrc'),
            this.destinationPath(this.props.name+'/.bowerrc')
          );
          this.fs.copyTpl(
            this.templatePath('_keys/_keys.json'),
            this.destinationPath(this.props.name+'/keys/keys.json'), {
              mongodb_uri:this.props.mongodb_uri
            }
          );
      },

    //Copy application files
    app: function() {
        //Server file
        this.fs.copy(
          this.templatePath('_server.js'),
          this.destinationPath(this.props.name+'/server.js')
        );
        //Routes
        this.fs.copy(
          this.templatePath('_routes/_todo.js'),
          this.destinationPath(this.props.name+'/routes/todo.js'));


        // Model
        this.fs.copy(
          this.templatePath('_model/_todo.js'),
          this.destinationPath(this.props.name+'/model/todo.js'));

        // Views
        this.fs.copyTpl(
          this.templatePath('_views/_index.ejs'),
          this.destinationPath(this.props.name+'/views/index.ejs'), {
            title: this.props.name,
            ui: this.props.ui
          }
        );

        // Public
        this.fs.copy(
          this.templatePath('_public/_css/_app.css'),
          this.destinationPath(this.props.name+'/public/css/app.css')
        );
        this.fs.copy(
          this.templatePath('_public/_js/_app.js'),
          this.destinationPath(this.props.name+'/public/js/app.js')
        );

        //database files
        this.fs.copy(
          this.templatePath('_db/_connector.js'),
          this.destinationPath(this.props.name+'/db/connector.js')
        )
      },
    //Install Dependencies
    install: function() {
        this.installDependencies();
      }
  }
});