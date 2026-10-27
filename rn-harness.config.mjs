import { androidEmulator, androidPlatform } from '@react-native-harness/platform-android'
import { applePlatform, appleSimulator } from '@react-native-harness/platform-apple'

export default {
  entryPoint: './index.ts',
  appRegistryComponentName: 'main',
  runners: [
    applePlatform({
      name: 'ios',
      device: appleSimulator('iPhone 17 Pro', '26.2'),
      bundleId: 'com.example.harnessaftereachrepro',
    }),
    androidPlatform({
      name: 'android',
      device: androidEmulator('Harness_API_35', { apiLevel: 35, profile: 'pixel_6', diskSize: '2G', heapSize: '1G' }),
      bundleId: 'com.example.harnessaftereachrepro',
    }),
  ],
}
