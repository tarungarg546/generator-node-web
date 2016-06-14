 'use strict';
//Require dependencies
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
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
                      message:'Github project link :- '
                    },{
                      type:"list",
                      name:"ui",
                      choices:["bootstrap","materialize","None"],
                      message:"Select client side library you wanna use :- ",
                      default:"bootstrap"
                    },{
                      type:'type',
                      name:'mongodb_uri',
                      message:'Enter mongodb url you wants to connect to :- '
                    },{
                      type:'confirm',
                      name:'angular',
                      message:'Are you using AngularJS in your project :- '
                    }];

    this.prompt(prompts, function (props) {
        this.props=props;

        done();
    }.bind(this));
  },
  writing: {
    //Copy the configuration files
    config: function () {
          this.fs.copyTpl(
              this.templatePath('_package.json'),
              this.destinationPath('package.json'), {
                  name: this.props.name,
                  description:this.props.description,
                  github:this.props.github
              }
          );
          this.fs.copyTpl(
              this.templatePath('_bower.json'),
              this.destinationPath('bower.json'), {
                  name: this.props.angular,
                  ui:this.props.ui
              }
          );
          this.fs.copy(
            this.templatePath('bowerrc'),
            this.destinationPath('.bowerrc')
          );
          this.fs.copyTpl(
            this.templatePath('_keys/keys.json'),
            this.destinationPath('keys/keys.json'), {
              mongodb_uri:this.props.mongodb_uri
            }
          );
      },

    //Copy application files
    app: function() {
        //Server file
        this.fs.copy(
          this.templatePath('_server.js'),
          this.destinationPath('server.js')
        );
        //Routes
        this.fs.copy(
          this.templatePath('_routes/_todo.js'),
          this.destinationPath('routes/todo.js'));


        // Model
        this.fs.copy(
          this.templatePath('_model/_todo.js'),
          this.destinationPath('model/todo.js'));

        // Views
        this.fs.copyTpl(
          this.templatePath('_views/_index.ejs'),
          this.destinationPath('/views/index.ejs'), {
            title: this.props.name
          }
        );

        // Public
        this.fs.copy(
          this.templatePath('_public/_css/_app.css'),
          this.destinationPath('public/css/app.css')
        );
        this.fs.copy(
          this.templatePath('_public/_js/_app.js'),
          this.destinationPath('public/js/app.js')
        );

        //database files
        this.fs.copy(
          this.templatePath('_db/_connector.js'),
          this.destinationPath('db/connector.js')
        )
      },
    //Install Dependencies
    install: function() {
        this.installDependencies();
      }
  }
});