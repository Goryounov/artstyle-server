import { Injectable } from '@nestjs/common'
const cluster = require('cluster')
import * as process from 'node:process'

const numCPUs = parseInt(process.argv[2] || "4")

@Injectable()
export class ClusterService {
  static clusterize(callback: Function): void {
    if (cluster.isMaster) {
      console.log(`Master server (${process.pid}) is running`)

      for (let i = 0; i < numCPUs; i++) {
        console.log(`Worker ${i} is running`)
        cluster.fork()
      }

      cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`)
      })
    } else {
      callback()
    }
  }
}