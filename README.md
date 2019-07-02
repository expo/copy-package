# copy-package

Allows you to download and copy files from a npm package from a temporary installation into your current directory.

```
import { copyPackageToTempDir } from 'copy-package';

try {
  let tmp = copyPackageToTempDir('expo-template-bare-minimum');

  // tmp.name gives you the path, do what you want with it!

  // call this to clean up
  tmp.removeCallback();
} catch(e) {
  // uh oh
}
```

```
$ npx copy-package expo-template-bare-minimum
$ cd expo-template-bare-minimum
```

## Attribution

The approach used to do this is copied from the wonderful [patch-package](https://github.com/ds300/patch-package).
