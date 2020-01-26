<template>
  <div>
    <div class="torrent-providers" v-loading="loading">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="1337X" name="1337x">
          <p v-if="!loading && the1337xResults && the1337xResults.length==0">No results in 1337x</p>
          <div v-else>
            <div
              v-for="(torrent,index) in the1337xResults.torrents"
              :key="torrent.torrentURL + index"
            >
              <el-card
                shadow="hover"
                class="torrent"
                :class="{ clickable: !torrent.actualTorrent }"
              >
                <div>
                  <h4 class="torrent-title">{{torrent.torrentName}}</h4>
                  <div class="torrent-meta">
                    <el-tag size="mini" effect="light" type="success">{{torrent.torrentSeeds}}</el-tag>
                    <el-tag size="mini" effect="light" type="danger">{{torrent.torrentLeeches}}</el-tag>
                  </div>
                </div>
                <div v-if="torrent.actualTorrent" class="torrent-download-options">
                  <MagnetIcon />
                  <DownloadIcon />
                </div>
              </el-card>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="YTS" name="yts">
          <p v-if="!loading && ytsResults && ytsResults.length==0">No results in YTS</p>
          <div v-else>
            <div v-for="(torrent,index) in ytsResults.torrents" :key="torrent.torrentURL + index">
              <el-card
                class="torrent"
                shadow="hover"
                :class="{ clickable: !torrent.actualTorrent }"
              >
                <div>
                  <h4 class="torrent-title">{{torrent.torrentName}}</h4>
                  <div class="torrent-meta">
                    <!-- <el-tag size="mini" effect="light">{{torrent.torrentName}}</el-tag> -->
                    <!-- <el-tag size="mini" effect="light" type="danger">1298</el-tag> -->
                  </div>
                </div>
                <div v-if="torrent.actualTorrent" class="torrent-download-options">
                  <MagnetIcon />
                  <DownloadIcon />
                </div>
              </el-card>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Nyaa.si" name="nyaa.si">
          <p v-if="!loading && nyaasiResults && nyaasiResults.length==0">No results in Nyaa.si</p>
          <div v-else>
            <div
              v-for="(torrent,index) in nyaasiResults.torrents"
              :key="torrent.torrentMagnetLink + index"
            >
              <el-card class="torrent" shadow="hover">
                <div>
                  <h4 class="torrent-title">{{torrent.torrentName}}</h4>
                  <div class="torrent-meta">
                    <el-tag size="mini" effect="light" type="info">{{torrent.torrentSize}}</el-tag>
                    <el-tag size="mini" effect="light" type="success">{{torrent.torrentSeeds}}</el-tag>
                    <el-tag size="mini" effect="light" type="danger">{{torrent.torrentLeeches}}</el-tag>
                  </div>
                </div>
                <div v-if="torrent.actualTorrent" class="torrent-download-options">
                  <a
                    :href="torrent.torrentMagnetLink"
                    v-tooltip.top-start="{ content: 'Download Magnet', classes:'v-tooltip'}"
                  >
                    <MagnetIcon />
                  </a>
                  <a
                    :href="torrent.torrentDownloadLink"
                    v-tooltip.top-start="{ content: 'Download Torrent File', classes:'v-tooltip'}"
                  >
                    <DownloadIcon />
                  </a>
                </div>
              </el-card>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <!-- <nuxt-link to='/search/yts'>YTS</nuxt-link>
            <nuxt-link to='/search/1337x'>1337x</nuxt-link>
      <nuxt-link to='/search/nyaasi'>Nyaa.si</nuxt-link>-->

      <!-- <p @click="goto('yts')">YTS</p>
            <p @click="goto('1337x')">1337x</p>
      <p @click="goto('nyaasi')">Nyaa.si</p>-->
    </div>
    <!-- <nuxt-child /> -->
  </div>
</template>

<script>
import MagnetIcon from '~/assets/Icons/magnet.svg?inline'
import DownloadIcon from '~/assets/Icons/download.svg?inline'

export default {
  components: {
    MagnetIcon,
    DownloadIcon
  },
  data() {
    return {
      searchTerm: '',
      activeName: '1337x',
      searchResults: [],
      ytsResults: [],
      nyaasiResults: [],
      the1337xResults: [],
      loading: true
    }
  },
  methods: {
    goto(url) {
      this.$router.push(`/search/${url}`)
    },
    handleClick(tab, event) {
      // console.log(tab);
      const url = tab.label
    },
    async fetchSearchResults() {
      //   this.nyaasiResults = []
      //   this.the1337xResults = []
      //   this.ytsResults = []

      const results = await this.$store.dispatch(
        'fetchSearchResults',
        this.searchTerm
      )

      this.loading = false
      if (!results.data.error) {
        if (results.data.cached) {
          this.searchResults = JSON.parse(results.data.data)
        } else {
          this.searchResults = results.data.payload
        }

        this.nyaasiResults = this.searchResults.filter(
          data => data.name === 'Nyaa.si'
        )[0]

        this.ytsResults = this.searchResults.filter(
          data => data.name === 'YTS'
        )[0]

        this.the1337xResults = this.searchResults.filter(
          data => data.name === '1337x'
        )[0]
      } else {
        const h = this.$createElement
        this.$notify({
          title: 'Something went wrong',
          message: h('i', { style: 'color: teal' }, results.data.message)
        })
      }
    }
  },
  watch: {
    $route(to, from) {
      if (to.query.q !== from.query.q) {
        this.searchTerm = to.query.q
        this.fetchSearchResults()
        this.loading = true
      }
    }
  },
  created() {
    this.searchTerm = this.$route.query.q
    this.fetchSearchResults()
  }
}
</script>