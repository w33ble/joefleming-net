---
title: "Duplicate Data in NoSQL is OK"
date: 2013-09-06
tags: "nosql, redis, mongodb"
---

I started using Redis for a project recently, and so far it's been pretty fun. It's an interesting storage solution which most people equate to a key/value store. It's more than that, and summing it up thusly ignores some of the uniqueness of Redis. But, this isn't a post about Redis specifically, so I won't dwell on that.

One of the issues I ran in to early on is not knowing how how to query the hashes I was storing. In my use case, I was just pumping information to unique keys, in the reverse order I wanted them to be consumed (last in, first out). What I couldn't figure out was how to read hashes back in order, since all the keys were unique to the records. Well, it turns out, that's kind of by design; Redis doesn't have a powerful mechanism to search for data.

The solution I came up with, and the solution I've seen used elsewhere as well (so I think it might even be right) is to store those unique hash keys in a list, and query the list for those keys, in order, and then use that list of keys to fetch the hashes they represent. This worked really well, and it was very fast.

If you're coming from the relation world of SQL, you might balk at the idea of storing this information twice. It seems dirty and repetitive, after all. But in the NoSQL world, this pattern is actually fairly common, at least in my experience.

I'll use the classic example a MongoDB-powered blog with multiple users. You may find it faster and beneficial to store the user record in with the post record, so you don't have to look it up separately. Likewise with any comments on posts. If you expect that user information to change, you can address it with update hooks so your data stays in sync, effectively only doing that data processing once and storing that result for future use.

But, maybe keeping all that information in sync is too much work for you so you want to keep it all separate. It's probably still useful to record metadata in the user record so you can avoid a second trip to the datastore. Information like the count of posts and comments would be handy to put directly in the user record, so you can show metadata about the user without calculating that every time. Keeping that data in sync is still an issue, but it's much less critical, and can speed things up in the long run. After all, much like the fastest code is the code you don't write, the fastest query is the one you don't make.

This idea of replicating data seems more common in the NoSQL world, perhaps because you don't have the luxury of joining records or doing complex queries. The trade-off is that you don't have that relational overhead, so your datastore is much faster. To me, it seem that data duplication is a way to compensate for not being able to do joins, and it's worth any dirty feeling you get as a result.