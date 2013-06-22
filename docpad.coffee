cheerio = require 'cheerio'
moment = require 'moment'
fs = require 'fs'

# DocPad Configuration File
# http://docpad.org/docs/config

# Define the DocPad Configuration
docpadConfig =
  # =================================
  # Server Configuration
  port: null  # default
  regenerateEvery: 1000*60*60 # hour


  # =================================
  # Template Configuration
  templateData:
    site:
      title: "JoeFleming.net"
      name: "Joe Fleming.net"
      url: "http://joefleming.net"
      author: "Joe Fleming"
      description: "Personal site of Joe Fleming (@w33ble)"
      keywords: """
        consulting, web development, development, open source, blog, node.js, javascript
        """

      # Scripts
      getScripts: (env) ->
        if env in ['production', 'static']
          ['/js/site.min.js']
        else
          [
            '/vendor/respond.min.js'
            # '/vendor/jquery.min.js'
            '/vendor/highlightjs/highlight.pack.js'
            '/js/site.js'
          ]

      # Stylesheets
      getStyles: (env) ->
        if env in ['production', 'static']
          [
            'http://fonts.googleapis.com/css?family=Lato|PT+Sans|Inconsolata|Raleway'
            '/css/site.min.css'
          ]
        else
          [
            'http://fonts.googleapis.com/css?family=Lato|PT+Sans|Inconsolata|Raleway'
            '/vendor/normalize.min.css'
            '/vendor/highlightjs/tomorrow-night.css'
            '/css/site.css'
          ]

    # Helpers
    # =======
    # Functions available in the templates

    moment: moment

    #
    getPreparedTitle: ->
      if @document.title
        "#{@site.title} | #{@document.title}"
      else
        @site.title

    getPreparedDescription: ->
      if @document.description
        @document.description
      else
        @site.description

    getPreparedKeywords: ->
      k = ''
      if @document.tags
        k += "#{@document.tags},"

      k += @site.keywords

    getPostPreview: (post) ->
      $ = cheerio.load post.contentRenderedWithoutLayouts
      preview = $('p').first()
      preview.find('img,script').remove()
      "<p>" + preview.html() + "</p>"


  # Collections
  # ===========
  # These are special collections that our website makes available to us

  collections:
    # Fetch in all documents that have pageOrder set within their meta data
    # Order by pageOrder: asc, title: asc
    pages: ->
      @getCollection('documents').findAllLive(
        pageOrder:
          $exists: true
        , [ pageOrder: 1, title: 1 ]
      )

    # Fetch all posts from directory
    # Order by date: desc
    posts: ->
      @getCollection('documents').findAllLive(
        relativeOutDirPath:'posts'
        date:
          $lte: moment().subtract('hours', 7)
      , [date:-1]
      ).on 'add', (model) ->
        model.setMetaDefaults layout:"post"

    # Fetch all posts from directory
    # Order by date: desc
    news: ->
      @getCollection('documents').findAllLive(
        relativeOutDirPath:'news'
        date:
          $lte: moment().subtract('hours', 7)
        expires:
          $gte: moment().subtract('hours', 7)
      , [date:-1]
      )

    # Fetch all learning topics from directory
    # Order by date: desc
    # topics: (database) ->
    #   database.findAllLive
    #     ignored:
    #       $or: [false, undefined, null]
    #     relativeOutDirPath: 'topics',
    #     [ date: -1 ]


  # ===========
  # Plugins

  plugins:
    feedr:
      timeout: 1000*60*10
      feeds:
        'github-starred':
          url: "https://api.github.com/users/w33ble/starred?page=0&per_page=5&sort=date"
        "github-repos":
          url: "https://api.github.com/users/w33ble/repos?page=0&per_page=5&sort=pushed"




# Export the DocPad Configuration
module.exports = docpadConfig