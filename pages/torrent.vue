<template>
  <div style="padding:2rem 0;" v-loading="loading">
    <div v-if="torrentToSearch.torrentSource==='1337x'">
      <el-card shadow="hover" class="torrent">
        <div>
          <h4 class="torrent-title">{{torrentToSearch.torrentName}}</h4>
          <p class="torrent-description" v-html="resultOf1337.torrentDescription"></p>
          <div class="torrent-meta">
            <el-tag
              size="mini"
              effect="light"
              type="success"
              v-if="torrentToSearch.torrentSeeds"
            >{{torrentToSearch.torrentSeeds}} Seeds</el-tag>
            <el-tag
              size="mini"
              effect="light"
              type="danger"
              v-if="torrentToSearch.torrentLeeches"
            >{{torrentToSearch.torrentLeeches}} Leeches</el-tag>
            <el-tag
              size="mini"
              effect="light"
              type="info"
            >{{resultOf1337.torrentDownloads}} Downloads</el-tag>
            <a :href="resultOf1337.magnet">
              <MagnetIcon />
            </a>
          </div>
        </div>
      </el-card>
    </div>
    <div v-else>
      <div v-for="(torrent,index) in ytsResults" :key="torrent.torrentLink + index">
        <el-card shadow="hover" class="torrent">
          <div>
            <!-- <YTSLogo /> -->
            <h4 class="torrent-title">{{torrent.torrentName}}</h4>
            <div v-if="torrent.actualTorrent" class="torrent-download-options">
              <a :href="torrent.torrentLink">
                <DownloadIcon />
              </a>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import MagnetIcon from '~/assets/Icons/magnet.svg?inline'
import DownloadIcon from '~/assets/Icons/download.svg?inline'
import YTSLogo from '~/assets/Icons/yts.svg?inline'

export default {
  components: {
    MagnetIcon,
    DownloadIcon,
    YTSLogo
  },
  data() {
    return {
      url: '',
      torrentToSearch: '',
      ytsResults: [],
      resultOf1337: {},
      loading: true
    }
  },
  methods: {
    async findTorrentInfo() {
      const results = await this.$store.dispatch('findTorrentInfo', {
        url: this.url,
        torrentSource: this.torrentSource
      })
      this.loading = false
      if (!results.data.error) {
        if (results.data.payload.torrentSource === '1337x') {
          this.resultOf1337 = results.data.payload.torrents
        } else {
          this.ytsResults = results.data.payload.torrents
        }
      }
    }
  },
  // watch: {
  //   $route(to, from) {

  //     if (to.query.url === from.query.url) {
  //       this.url = to.query.url
  //       this.torrentSource = to.query.torrentSource
  //       this.torrentToSearch = this.$store.state.torrentSource
  //       this.findTorrentInfo()
  //       this.loading = true
  //     }
  //   }
  // },

  created() {
    this.torrentToSearch = this.$store.state.torrentToSearch
    this.url = this.$route.query.url
    this.torrentSource = this.$route.query.torrentSource

    this.findTorrentInfo()
  }
}
</script>