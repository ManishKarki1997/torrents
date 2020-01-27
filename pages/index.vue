<template>
  <div class="home-main" v-loading="loading">
    <el-tabs type="border-card">
      <el-tab-pane label="YTS">
        <div class="yts-feeds" v-if="feeds.ytsFeeds">
          <section class="home-section">
            <h4>Latest Movies</h4>
            <ytsFeedsContainer
              @gotoMovie="goto"
              :ytsFeeds="feeds.ytsFeeds.latestMoviesTorrents.slice(0,3)"
            />
          </section>
          <section class="home-section">
            <h4>Latest Movies</h4>
            <ytsFeedsContainer
              @gotoMovie="goto"
              :ytsFeeds="feeds.ytsFeeds.popularDownloads.slice(0,3)"
            />
          </section>
        </div>
        <div v-else>
          <p>No results found in YTS</p>
        </div>
      </el-tab-pane>
      <el-tab-pane label="1337x">
        <div class="yts-feeds" v-if="feeds._1337xFeeds">
          <section class="home-section">
            <h4>Latest Movies</h4>
            <the1337FeedsContainer
              @gotoMovie="goto"
              :feeds="feeds._1337xFeeds.popularMovies.slice(0,3)"
            />
          </section>
          <section class="home-section">
            <h4>Latest Games</h4>
            <the1337FeedsContainer
              @gotoMovie="goto"
              :feeds="feeds._1337xFeeds.popularGames.slice(0,3)"
            />
          </section>
          <section class="home-section">
            <h4>Latest Apps</h4>
            <the1337FeedsContainer
              @gotoMovie="goto"
              :feeds="feeds._1337xFeeds.popularApps.slice(0,3)"
            />
          </section>
          <section class="home-section">
            <h4>Latest TV Shows</h4>
            <the1337FeedsContainer
              @gotoMovie="goto"
              :feeds="feeds._1337xFeeds.popularTVShows.slice(0,3)"
            />
          </section>
        </div>
        <div v-else>
          <p>No results found in 1337x</p>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Nyaa.si">
        <nyaaSiFeedsContainer :feeds="feeds.nyaasiFeeds" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import MagnetIcon from '~/assets/Icons/magnet.svg?inline'
import DownloadIcon from '~/assets/Icons/download.svg?inline'

import ytsFeedsContainer from '~/components/ytsFeeds'
import the1337FeedsContainer from '~/components/_1337xFeeds'
import nyaaSiFeedsContainer from '~/components/nyaasiFeeds'

export default {
  components: {
    MagnetIcon,
    DownloadIcon,
    ytsFeedsContainer,
    the1337FeedsContainer,
    nyaaSiFeedsContainer
  },
  data() {
    return {
      loading: true,
      feeds: [],
      lastServerRefresh: ''
    }
  },

  methods: {
    async fetchFeeds() {
      const results = await this.$store.dispatch('fetchFeeds')
      this.loading = false
      if (!results.data.error) {
        this.feeds = results.data.payload
        this.lastServerRefresh = results.data.payload.lastRefreshed
      } else {
        const h = this.$createElement
        this.$notify({
          title: 'Something went wrong',
          message: h('i', { style: 'color: teal' }, results.data.message)
        })
      }
    },
    goto(feed) {
      const url = feed.torrent.torrentURL
      const torrentSource = feed.torrentSource
      let torrentToSearchFor = {
        torrentName: feed.torrent.torrentName || feed.torrent.movieName,
        torrentSource,
        torrentURL: url,
        actualTorrent: feed.torrent.actualTorrent
      }
      this.$store.commit('setTorrentToSearch', torrentToSearchFor)
      this.$router.push(`/torrent?url=${url}&torrentSource=${torrentSource}`)
    }
  },
  created() {
    this.fetchFeeds()
  }
}
</script>

<style>
</style>
