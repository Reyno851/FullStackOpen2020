/* eslint-disable no-undef */
describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
          name: 'Reynold',
          username: 'test',
          password: 'svanhagen'
        }
        const user2 = {
          name: 'hsmule',
          username: 'mule',
          password: 'hbmule'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.request('POST', 'http://localhost:3001/api/users/', user2)
        cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.contains('log in to application')
    })
    
    describe('Login',function() {
      it('succeeds with correct credentials', function() {
        cy.get('#username').type('test')
        cy.get('#password').type('svanhagen')
        cy.get('#login-button').click()

        cy.contains('Reynold logged in')
      })
  
      it('fails with wrong credentials', function() {
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()
  
        cy.get('.errorMessage')
          .should('contain', 'Wrong credentials')
          
        cy.get('.errorMessage').should('have.css', 'background-color', 'rgb(255, 0, 0)')

        cy.get('html').should('not.contain', 'Reynold logged in')
      })
    })
 

    describe('when logged in', function() {
        beforeEach(function() {
          cy.login({ username: 'test', password: 'svanhagen' })
        })
    
        it('a new blog can be created', function() {
          cy.contains('new blog').click()
          cy.get('#title').type('a title created by cypress')
          cy.get('#author').type('a author created by cypress')
          cy.get('#url').type('a url created by cypress')
          cy.get('#submit-button').click()
          cy.contains('a title created by cypress')
          cy.contains('a author created by cypress')
          cy.contains('a url created by cypress')
        })

        describe('if a blog exists', function () {
          beforeEach(function () {
            cy.createBlog({
              title: 'blog cypress to be liked and deleted',
              author: 'another author cypress',
              url: 'anothercypress.com',
              likes: '1000',

            })
          })

          it('it can be liked', function () {
            cy.contains('blog cypress to be liked and deleted')
            .contains('like')
            .click()
          })

          it('user who created blog can delete it', function () {
            cy
            .contains('blog cypress to be liked and deleted')
            .contains('view')
            .click()
            .parent()
            .parent()
            .find('#removeButton')
            .click()
          })

        })

    describe('when another user is logged in', function () {
      beforeEach(function(){
        cy.login({ username: 'test', password: 'svanhagen'})
        cy.createBlog({
          title: 'testing if new user can delete blog or not',
          author: 'J',
          url: 'anothercypress.com',
          likes: '1000',

        })
      })
      it('the user cannot delete the previously created blog post', function() {
        cy
        .contains('logout')
        .click()
        .login({ username: 'mule', password: 'hbmule' })
        .contains('view')
        .click()
        .parent()
        .parent()
        .should('not.contain', '#removeButton')
      })

    })

    // describe.only('if there are multiple blogs created', function () {
    //   beforeEach(function(){
    //     cy.login({ username: 'test', password: 'svanhagen'})
    //     cy.createBlog({
    //       title: 'some likes',
    //       author: 'J',
    //       url: 'anothercypress.com',
    //       likes: '50',

    //     })

    //     cy.createBlog({
    //       title: 'few likes',
    //       author: 'J',
    //       url: 'anothercypress.com',
    //       likes: '1',

    //     })

    //     cy.createBlog({
    //       title: 'most likes',
    //       author: 'J',
    //       url: 'anothercypress.com',
    //       likes: '5000',

    //     })

    //   })
    //   it('blogs are ordered according to number of likes', function() {
    //     cy
    //     .get('div.blogEntry')
    //     .then(blogs => {
    //       blogs.map(blog=>{
    //         return console.log("blog: ", blog)
    //       })
    //     })
    //   })

    })




  })

})