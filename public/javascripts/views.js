(function() {
  Neptune.HomeView = Ember.View.extend({
    templateName: 'home'
  });

  Neptune.NavigationView = Ember.View.extend({
    init: function() {
      this._super();
      if (this.isLoggedIn) {
        this.set("hideLogin", "hide");
        return this.set("hideLogout", "");
      } else {
        this.set("hideLogin", "");
        return this.set("hideLogout", "hide");
      }
    },
    templateName: 'navigation',
    hideLogin: "",
    hideLogout: "hide",
    isLoggedInBinding: 'Neptune.accountController.isLoggedIn',
    isLoggedInDidChange: (function() {
      if (this.isLoggedIn) {
        this.set("hideLogin", "");
        return this.set("hideLogout", "hide");
      } else {
        this.set("hideLogin", "hide");
        return this.set("hideLogout", "");
      }
    }).observes('Neptune.accountController.isLoggedIn'),
    login: null,
    forgotPassword: null,
    register: null,
    showSignIn: function() {
      $(".error").removeClass("error");
      this.set("login", Neptune.Login.create());
      $("#register").modal("hide");
      $("#forgotPassword").modal("hide");
      return $("#signIn").modal("show");
    },
    cancelSignIn: function() {
      return $("#signIn").modal("hide");
    },
    signIn: function() {
      var _this = this;
      return Neptune.accountController.login(this.login, function(data, error) {
        if (!error) {
          return $("#signIn").modal("hide");
        } else {
          $(".signin-group").addClass("error");
          return _this.set("login.error", error.message);
        }
      });
    },
    signInTextField: Ember.TextField.extend({
      insertNewline: function() {
        return this.get('parentView').signIn();
      }
    }),
    logout: function() {
      Neptune.accountController.logout();
      return Neptune.router.transitionTo('home', null);
    },
    showRegister: function() {
      $(".error").removeClass("error");
      this.set("register", Neptune.Register.create());
      $("#signIn").modal("hide");
      $("#forgotPassword").modal("hide");
      return $("#register").modal("show");
    },
    cancelRegister: function() {
      return $("#register").modal("hide");
    },
    registerUser: function() {
      var _this = this;
      return Neptune.accountController.register(this.register, function(data, error) {
        if (!error) {
          return $("#register").modal("hide");
        } else {
          $(".register-group").addClass("error");
          return _this.set("register.error", error.message);
        }
      });
    },
    fbLogin: function() {
      var _this = this;
      return Neptune.accountController.fbLogin(function(data, error) {
        if (!error) {
          $("#register").modal("hide");
          return $("#signIn").modal("hide");
        } else {
          $(".register-group").addClass("error");
          _this.set("register.error", error.message);
          $(".signin-group").addClass("error");
          return _this.set("login.error", error.message);
        }
      });
    },
    twLogin: function() {
      return alert('Twitter sign-in coming soon!');
    },
    registerTextField: Ember.TextField.extend({
      insertNewline: function() {
        return this.get('parentView').registerUser();
      }
    }),
    showForgotPassword: function() {
      $(".error").removeClass("error");
      this.set("forgotPassword", Neptune.ForgotPassword.create());
      $("#signIn").modal("hide");
      return $("#forgotPassword").modal("show");
    },
    cancelForgotPassword: function() {
      return $("#forgotPassword").modal("hide");
    },
    requestForgotPassword: function() {
      var _this = this;
      return Neptune.accountController.requestPasswordReset(this.forgotPassword, function(data, error) {
        if (!error) {
          return $("#forgotPassword").modal("hide");
        } else {
          $(".forgot-password-group").addClass("error");
          return _this.set("forgotPassword.error", error.message);
        }
      });
    },
    showInboxModal: function() {
      return $("#inboxModal").modal("show");
    },
    showFilter: function() {
      return $("#filter").modal("show");
    },
    cancelFilter: function() {
      return $("#filter").modal("hide");
    }
  });

  Neptune.MyProfileView = Ember.View.extend({
    templateName: 'my-profile',
    userBinding: 'Neptune.accountController.user',
    editUser: null,
    showEdit: function() {
      this.set('editUser', Neptune.User.create());
      this.set('editUser.firstName', this.get('user.firstName'));
      this.set('editUser.lastName', this.get('user.lastName'));
      return $('#editUser').modal('show');
    },
    cancelEdit: function() {
      return $('#editUser').modal('hide');
    },
    updateTextField: Ember.TextField.extend({
      insertNewline: function() {
        return this.get('parentView').updateUser();
      }
    }),
    updateUser: function() {
      return Neptune.accountController.updateUser(this.editUser, function(user, error) {
        if (!error) {
          return $("#editUser").modal("hide");
        } else {
          return alert('Error updating user, please try again later.');
        }
      });
    }
  });

  Neptune.EmailMessagingView = Ember.View.extend({
    templateName: 'email-messaging',
    contentBinding: 'Neptune.emailMessagingController.content',
    emailMessage: null,
    showSendMessage: function() {
      this.set('emailMessage', Neptune.EmailMessage.create());
      return $('#sendEmailMessage').modal('show');
    },
    cancelSendMessage: function() {
      return $('#sendEmailMessage').modal('hide');
    },
    sendMessage: function() {
      return Neptune.emailMessagingController.sendEmailMessage(this.emailMessage, function(data, error) {
        if (!error) {
          return $('#sendEmailMessage').modal('hide');
        }
      });
    }
  });

  Neptune.SmsMessagingView = Ember.View.extend({
    templateName: 'sms-messaging',
    contentBinding: 'Neptune.smsMessagingController.content',
    smsMessage: null,
    showSendMessage: function() {
      this.set('smsMessage', Neptune.SmsMessage.create());
      return $('#sendSmsMessage').modal('show');
    },
    cancelSendMessage: function() {
      return $('#sendSmsMessage').modal('hide');
    },
    sendMessage: function() {
      return Neptune.smsMessagingController.sendSmsMessage(this.smsMessage, function(data, error) {
        if (!error) {
          return $('#sendSmsMessage').modal('hide');
        }
      });
    }
  });

}).call(this);
