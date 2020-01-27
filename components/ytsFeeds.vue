<template>
  <div class="torrents">
    <el-card
      class="torrent"
      shadow="hover"
      v-for="(ytsFeed,index) in ytsFeeds"
      :key="ytsFeed.torrentURL + index"
    >
      <div  class="torrent-info">
        <h4 :class="{ clickable: !ytsFeed.actualTorrent }" @click="sendTorrent(ytsFeed)" class="torrent-title">{{ytsFeed.movieName}}</h4>
        <p>{{ytsFeed.releaseYear}}</p>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ['ytsFeeds'],
  data() {
    return {}
  },
  methods: {
    sendTorrent(torrent) {
      this.$emit('gotoMovie', { torrent, torrentSource: 'YTS' })
    }
  }
}
</script>

