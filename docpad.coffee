# DocPad Configuration File
# http://docpad.org/docs/config

# Define the DocPad Configuration
docpadConfig =
  # data to pass to the templates
  templateData:
    site:
      title: "JoeFleming.net"
      name: "Joe Fleming dot net"
      url: "http://joefleming.net"
      author: "Joe Fleming"
      description: "Witty site description"
      keywords: "blah..."

    # Helpers
    # =======
    # Functions available in the templates

    #
    getPageTitle: ->
      if @document.title
        "#{@site.title} | #{@document.title}"
      else
        @site.title

    getPageDescription: ->
      if @document.description
        @document.description
      else
        @site.description

    getPageKeywords: ->
      k = ''
      if @document.tags
        k += "#{@document.tags},"

      k += @site.keywords

  # Collections
  # ===========
  # These are special collections that our website makes available to us

  collections:
    # Fetch in all documents that have pageOrder set within their meta data
    # Order by pageOrder: asc, title: asc
    pages: (database) ->
      database.findAllLive
        ignored:
          $or: [false, undefined, null]
        pageOrder:
          $exists: true,
        [ pageOrder: 1, title: 1 ]

    # Fetch all posts from directory
    # Order by date: desc
    posts: (database) ->
      database.findAllLive
        ignored:
          $or: [false, undefined, null]
        relativeOutDirPath: 'posts',
        [ date: -1 ]

    # Fetch all learning topics from directory
    # Order by date: desc
    topics: (database) ->
      database.findAllLive
        ignored:
          $or: [false, undefined, null]
        relativeOutDirPath: 'topics',
        [ date: -1 ]

# Export the DocPad Configuration
module.exports = docpadConfig