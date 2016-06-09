var redirect = require('metalsmith-redirect');

module.exports = function () {
  return redirect({
    '/posts': '/all-posts',
    '/old-posts': '/all-posts',
    '/posts/a-history-of-coding-and-computers': '/posts/my-history-of-coding-and-computers',
    '/posts/configure-apache-for-multiple-wordpress-sites': '/posts/configuring-apache-and-fcgi-for-multiple-wordpress-sites',
    '/posts/drupals-on-hold': '/posts/drupal-s-on-hold',
    '/posts/evernotes-clearly': '/posts/evernote-s-clearly',
    '/posts/grunt-painless-build-process': '/posts/grunt-for-a-painless-build-process',
    '/posts/how-i-use-backbone-router': '/posts/how-i-use-backbone-s-router',
    '/posts/ill-have-one-of-your-finest-arduinos-please': '/posts/i-ll-have-one-of-your-finest-arduinos-please',
    '/posts/inaugural-openhack-postmortem': '/posts/inaugural-openhackphx-a-postmortem',
    '/posts/openhack-002-portmortem': '/posts/openhackphx-002-a-postmortem',
    '/posts/remote-backups-with-amazons-s3': '/posts/remote-backups-with-amazon-s-s3',
    '/posts/skirting-isp-torrent-fitlering': '/posts/skirting-isp-torrent-filtering-reset-requests',
    '/posts/slim-jade': '/posts/slim-jade-a-light-weight-php-framework-using-jade-templates',
    '/posts/static-sites-rock': '/posts/static-websites-rock',
    '/posts/wordpress-out-docpad-in': '/posts/wordpress-is-out-docpad-is-in',
    '/posts/asynchronous-php': '/posts/asynchronous-file-downloads-in-php',
    '/feed': '/posts.xml',
  });
};