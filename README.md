# Skene

Part of the [Gonzo Engineering](https://gonzo.engineering) project, Skene is a collection of tools and templates intended to empower musicians to create unique, independent online presences.

Currently powering:

- [thomasashby.co.uk](https://thomasashby.co.uk)

More to come, hopefully.

## Why?

Maintaining a website takes time and money, both of which most musicians would rather be spending on their music. Third party platforms offer limited control, and some subscriptions can amount to hefty sums over time.  

The idea with Skene that if essential info - artist details, releases, lyrics, gigs, etc. - is turned into data, that data can be used to generate rich, immersive websites, giving artists fully customisable spaces of their own on the web.

Think the [Neil Young Archives](https://neilyoungarchives.com/), but for everyone.

## How?

The working approach for this is to build an agnostic site template using [SvelteKit](https://svelte.dev). Dropping a handful of datasets into that template will generate a fully functioning website that just needs to be deployed somewhere.

For now the form of this data is raw JSON and needs to be hardcoded. Ideally there would be a way for musicians to input this information more elegantly, but one step at a time.
