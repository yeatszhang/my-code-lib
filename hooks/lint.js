const { exec, execFileSync } = require('child_process')
const gitDiffCmd = "git diff --cached --name-only | grep -E '^websrc/(src|test)/.*\\.(js|vue|css|less)$'"
const stylePaths = []
const jsPaths = []

exec(gitDiffCmd, function (error, stdout, stderr) {
  const files = stdout.split('\n')
  if (files.length === 0) process.exit(0)

  files.forEach(function (path) {
    const reJS = /\.(js|vue)$/
    const reCSS = /\.(css|less)$/
    if (reJS.test(path)) jsPaths.push(path)
    if (reCSS.test(path)) stylePaths.push(path)
  })

  if (jsPaths.length > 0) {
    try {
      execFileSync('./websrc/node_modules/.bin/eslint', jsPaths, { stdio: 'inherit' })
    } catch (err) {
      console.error('eslint执行出错！')
      process.exit(1)
    }
  }

  if (stylePaths.length > 0) {
    try {
      execFileSync('./websrc/node_modules/.bin/stylelint', stylePaths, { stdio: 'inherit' })
    } catch (err) {
      console.error('stylelint执行出错！')
      process.exit(1)
    }
  }
})

