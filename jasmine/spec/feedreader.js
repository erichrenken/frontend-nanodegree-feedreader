/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    describe('RSS Feeds', function() {

        // This function checks for the existence of the allFeeds variable
        // and checks the array.length to ensure it's not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // This function loops through allFeeds to ensure that the url property
        // is defined and it's not empty
        it('have non-empty URLs', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
            });
            allFeeds.forEach(function(feed) {
                expect(feed.url.length).not.toBe(0);
            });
        });

        // This function loops through allFeeds to ensure that the name property
        // is defined and it's not empty
        it('have non-empty names', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
            });
            allFeeds.forEach(function(feed) {
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    describe('The menu', function() {

        // Because the menu-hidden class is only added when the menu is hidden, this
        // function checks for the existence of the menu-hidden class in the body tag
        it('is hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

        describe('When it is clicked', function() {

            // This function sends a click event before each of the subsequent functions
            beforeEach(function() {
                $('.menu-icon-link').trigger('click');
            });

            // The body tag will not have a menu-hidden class associated with it when
            // the menu is showing
            it('it shows', function() {
                expect($('body').hasClass('menu-hidden')).toBeFalsy();
            });

            // The body tag will have a menu-hidden class associated with it when
            // the menu is hidden
            it('and hides', function() {
                expect($('body').hasClass('menu-hidden')).toBeTruthy();
            });
        });


    });

    describe('Initial Entries', function() {

        // This function loads the Udacity feed and uses the 'done' callback to
        // avoid issues with asynchrounous functionality
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        // This function checks to see that data has been retrieved and the array 
        // length is not zero
        it('are shown', function(done) {
            expect($('.feed').children().length).not.toBe(0);
            done();
        })

    });

    describe('New Feed Selection', function() {
        var initialText;

        // This function loads the initial feed, and then uses the callback functionality 
        // to save the title of the first entry and initiate loading the second feed for 
        // comparison
        beforeEach(function(done) {
            loadFeed(0, function() {
                initialText = $('.feed').children()[0].innerText;
                loadFeed(1, done);
            });
        });

        // This function retrieves the title of the first entry from the second feed and
        // compares it to the title of the first entry from the first feed.
        it('loads new text', function(done) {
            var secondaryText = $('.feed').children()[0].innerText;
            expect(initialText).not.toBe(secondaryText);
            done();
        });

    });

}());
