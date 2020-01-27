<template>
  <div class="torrents">
    <el-card
      class="torrent"
      shadow="hover"
      v-for="(feed,index) in feeds"
      :key="feed.torrentMagnetLink + index"
      :class="{ clickable: !feed.actualTorrent }"
    >
      <div class="torrent-info">
        <h4 class="torrent-title">{{feed.torrentName}}</h4>
        <div class="torrent-meta">
          <el-tag size="mini" effect="light">{{feed.torrentSeeds}} Seeds</el-tag>
          <el-tag size="mini" effect="light" type="danger">{{feed.torrentLeeches}} Leeches</el-tag>
          <el-tag size="mini" effect="light" type="info">{{feed.torrentSize}}</el-tag>
          <div class="torrent-download-options">
            <a :href="feed.torrentMagnetLink">
              <MagnetIcon />
            </a>
            <a :href="feed.torrentDownloadLink">
              <DownloadIcon />
            </a>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import MagnetIcon from '~/assets/Icons/magnet.svg?inline'
import DownloadIcon from '~/assets/Icons/download.svg?inline'

export default {
  props: ['feeds'],
  components: {
    MagnetIcon,
    DownloadIcon
  }
}
</script>