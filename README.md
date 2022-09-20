# NPMS(cripts)

a CLI shows your project npm scripts

## Installation

```bash
pnpm install @alexzzz/npms
```

## Usage

```bash
# in your package root
npms
```

then, you could see these things on your terminal：

![usage](screenshots/usage-1.png)

We support recursively get `package.json` scripts.

You can press `<arrow-left>` and `<arrow-right>` to switch packages.

## Known Issues

- [ ] if packages too many, packages'tab will squeeze it together
- [ ] if scripts too many, scripts container could not scroll

These behaviors are caused by TEMir, and i maybe will make pr then.

## Next Step

- [ ] fixed known issues
- [ ] support config
- [ ] show cli help command

## License

MIT, alexzhang1030

## Reference

- [temir](https://github.com/webfansplz/temir)
