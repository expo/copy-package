# copy-package

Allows you to download and copy files from a npm package from a temporary installation into your current directory.

```
import { copyPackageToTempDir } from 'copy-package';

(async () => {
  try {
    let path = await copyPackageToTempDir('expo-template-bare-minimum');
  } catch(e) {
    // uh oh
  }
})();
```

```
$ copy-package expo-template-bare-minimum .
```

## Attribution

The approach used to do this is copied from the wonderful [patch-package](https://github.com/ds300/patch-package).
