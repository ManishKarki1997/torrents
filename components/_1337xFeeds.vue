<template>
  <div class="torrents">
    <el-card
      class="torrent"
      shadow="hover"
      v-for="(feed,index) in feeds"
      :key="feed.torrentURL + index"
    >
      <div>
        <h4
          :class="{ clickable: !feed.actualTorrent }"
          @click="sendTorrent(feed)"
          class="torrent-title"
        >{{feed.torrentName}}</h4>
        <div class="torrent-meta">
          <el-tag size="mini" effect="light">{{feed.torrentSeeds}} Seeds</el-tag>
          <el-tag size="mini" effect="light" type="danger">{{feed.torrentLeeches}} Leeches</el-tag>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ['feeds'],
  methods: {
    sendTorrent(torrent) {
      this.$emit('gotoMovie', { torrent, torrentSource: '1337x' })
    }
  }
}
</script>