---
layout: post
title: 为 GitHub 项目配置持续集成 (CI)
subtitle: 试试 Travis CI 吧
author: DaddyTrap
date: 2018-04-10 11:02:26 +0800
categories: Tutorial Github
---

## Reference

+ [持续集成服务 Travis CI 教程](http://www.ruanyifeng.com/blog/2017/12/travis_ci_tutorial.html)
+ [SSH deploys with Travis CI](https://oncletom.io/2016/travis-ssh-deploy/)
+ [Auto-Deploying via Travis CI](https://gist.github.com/nickbclifford/16c5be884c8a15dca02dca09f65f97bd)
+ [Encrypting Files - Travis CI](https://docs.travis-ci.com/user/encrypting-files/#Using-OpenSSL)

## 前言

### [CI(持续集成)](https://en.wikipedia.org/wiki/Continuous_integration) 是什么

> In software engineering, continuous integration (CI) is the practice of merging all developer working copies to a shared mainline several times a day.

> 大意: 在软件工程中，持续集成是一种这样的实践: 一天中多次将所有开发者的工作副本整合到一个共享的主线上。

<!-- more -->

### 用来做什么

虽然上面可能看的是云里雾里，但是我们可以直接说出 CI 可以用来做什么。

在 GitHub 中，使用最多的 CI 服务是 [Travis CI](https://travis-ci.org/)，其作用就是在 Git 仓库代码发生更改时(push/accept pull request/...)，执行一系列(一般)用于 **测试(Test)**、**构建(Build)** 的命令，以此完成自动构建、自动测试的工作。

## 前置

+ GitHub账号
+ 需要配置CI的仓库

## Travis CI 页面

访问 [https://travis-ci.org/](https://travis-ci.org/) 点击右上角的 `Sign in with GitHub` 使用 GitHub 账号登录 Travis CI

![](/assets/travis_ci_tutorial/sign_in.png)

登入后，页面会列出你的仓库，如果没有的话，应该找到左侧栏的 `My Repositories` 隔壁的加号，就可以看到。将其中想要使用 CI 的仓库的开关打开，那么 Travis CI 就会对这个仓库的 **更改** 有响应。

![](/assets/travis_ci_tutorial/repo_list.png)

在这里我选择了自己的 `learngit` 为例。

## .travis.yml

`.travis.yml` 文件需要放在项目的 **根目录**，其中的内容就是 CI 最核心的部分，包含着对 CI 过程的描述(如项目使用的语言、在相应阶段执行的脚本等等)

关于 `travis.yml` 的具体语法，可以参考 travis 的 [官方 guide](https://docs.travis-ci.com/user/getting-started/)

在此，我们暂且依葫芦画瓢

```yaml
language: python
python:
- '3.6'
sudo: false
```

上面的意思是，项目使用 python3.6，执行 CI 不需要 sudo 权限

> 选用不同的language导致的结果是会有不同的默认 install/script 设置

但是仅有上面的设置，不足以描述 CI 过程，比如具体如何 **测试**、如何 **构建** 都没有提到，因此到这还不够，且看下面部分

## Travis CI 流程

### 必经阶段

对于项目必定有两个阶段，即

+ install 阶段 - 安装依赖
+ script 阶段 - 运行脚本

实际上，两个阶段就是一组命令的列表，而其不同之处在于

+ 在 install 阶段，只要有一个命令失败，就会终止 CI，并认为失败
+ 在 script 阶段，如果有一个命令失败，不会终止 CI，而是继续执行下一条命令，但最后还是认为失败

另外，如果想要跳过这两种阶段，则如下

```yaml
install: true
script: true
```

两行可以不同时出现

### 实例

#### Python 项目

```yaml
install: pip install -r requirements.txt
script: pytest
```

上面是单条指令的例子

#### Node.js 项目

```yaml
install: npm i
script:
- node test1.js
- node test2.js
```

多条指令的用法如上

### Deploy(部署) 阶段

部署阶段并不是一个必经的阶段，不需要(且不能)用 `deploy: true` 来跳过，只要不写就没有 `deploy` 阶段。

Travis CI 已经为一些常用的部署做好了支持，具体可以参阅 [官方文档](https://docs.travis-ci.com/user/deployment/)，如 GitHub Pages 的部署

```yaml
deploy:
  provider: pages
  skip-cleanup: true
  github-token: $GITHUB_TOKEN  # Set in travis-ci.org dashboard, marked secure
  on:
    branch: master
```

上面的意思是
+ 使用 `pages` 的部署方法 (provider即“提供该服务的人”)
+ 跳过 删除构建的文件 的动作
+ 使用的 github-token
+ 在 master 分支才会执行这个部署

<div id="deploy-script" />

有一种稍有点特殊的部署方法是 `script`，它并不是由某个服务提供商提供，而是就是执行一段 **script** 来部署，如下

```yaml
deploy:
  provider: script
  script: bash scripts/deploy.sh
  on:
    branch: develop
```

+ 执行命令 `bash scripts/deploy.sh`
+ 在 develop 分支才会执行这个部署

### 阶段Hook

所谓Hook其实就是对应每个阶段，可以在每个阶段 之前/之后 等，执行一组指令，所有的Hook如下

+ before_install：install 阶段之前执行
+ before_script：script 阶段之前执行
+ after_failure：script 阶段失败时执行
+ after_success：script 阶段成功时执行
+ before_deploy：deploy 步骤之前执行
+ after_deploy：deploy 步骤之后执行
+ after_script：script 阶段之后执行

完整的流程如下

1. before_install
2. install
3. before_script
4. script
5. aftersuccess or afterfailure
6. [OPTIONAL] before_deploy
7. [OPTIONAL] deploy
8. [OPTIONAL] after_deploy
9. after_script

678 的 [OPTIONAL] 的意思是，deploy 是可以不执行的，而当 deploy 不执行时，68 也不会执行

通过下面这个 `.travis.yml` 可以清楚地看到阶段的顺序

```yaml
language: python
sudo: false
before_install: echo "`date` - travis CI build"
install:
  - echo "install"
before_script: echo "before_script"
script:
  - echo "script"
after_failure: echo "after_failure"
after_success: echo "after_success"
before_deploy: echo "before_deploy"
after_deploy: echo "after_deploy"
after_script: echo "after_script"
```

### 思考

**一般地**，在 install 阶段执行 **依赖安装**，在 script 阶段执行 **运行脚本** —— 一般是运行 **测试+构建** 脚本，在 deploy 阶段执行 **部署**。

然而，不难看出，只要清楚流程顺序，我们想怎么搞怎么搞，因此这些流程的名字可以只作参考，具体怎么玩，还是看自己

## 自动部署到自己的云服务器

`deploy` 阶段可以通过设置 `provider` 字段来表示将服务部署到各种服务提供商，但是如果想部署到自己的云服务器，要怎么办呢？

Travis CI 实际上是一个第三方的 **CI runner**，其工作就是监测仓库的变动，当仓库有变动时执行配置的脚本。而我之前是使用过 **gitlab** 的 CI runner，其原理就是通过 HTTP 轮询 gitlab，发现变动时执行脚本。gitlab-runner 是放在自己的服务器的，当然就可以通过脚本把项目部署到本地；但是 travis 则不是这样的，所以下面就看看，需要怎样的操作。

### 总览

部署到远程服务器，需要考虑这些问题

+ 如何登录到远程服务器
  + 使用密码登录
  + 使用ssh密钥登录
+ 如何在远程服务器执行脚本
  + 使用ssh

### 配置ssh密钥

登录到远程服务器的两种手段中，使用密码登录，就会使得密码出现在 `.travis.yml` 的明文中；使用ssh密钥登录，又需要把私钥文件推到远程仓库。而远程仓库有很大的可能是public的，这样就会出现重大的安全问题。

所幸 travis 提供了一种解决的方法，那就是 `travis encrypt` 。使用 `travis encrypt` 可以生成加密的环境变量、使用 `travis encrypt-file` 可以生成加密的文件，这一个 **加密** 只有 travis 能解开，也就是说只要你信任 travis，那么就不用忧虑安全问题啦！(笑)

那么就开始吧

#### 生成、配置RSA密钥

```bash
ssh-keygen -t rsa -b 4096 -C 'build@travis-ci.org' -f ./deploy_rsa
```

> 如果使用的是 Windows 系统，推荐在 Git Bash 中使用上述指令

执行过程中，会询问是否要使用 `passphrase`，在此为方便起见我们不进行设置，直接 enter 跳过

执行完毕，就会在目录下发现两个新的文件 `deploy_rsa` 和 `deploy_rsa.pub`。记得我看过一篇博客说过 “公钥可以公开出去给别人看，私钥打死都不要送出去！”，就是这么个道理。`deploy_rsa.pub` 的内容是可以公开的，而私钥 `deploy_rsa` 则绝对 **不能** 公开。

为了“免密码”登录，我们需要把 `deploy_rsa.pub` 的内容添加到云服务器的 `~/.ssh/authorized_keys` 中，如果没有这个目录/文件，可以自己创建

此处的 `~` 表示 `/home/<username>`，想要哪个用户免密码登录，就放在哪个用户的主目录下，安全起见，个人推荐为 travis 创建一个新的用户

![](/assets/travis_ci_tutorial/authorized_keys.png)

#### 加密私钥文件


##### 安装 Travis 工具

首先需要 ruby 环境，如果之前配置过 GitHub Pages + jekyll 应该没有问题

关于 Ruby 的安装，可以参考鄙人另一篇博客的[一部分](/tutorial/2017/10/01/setup-jekyll-gh-pages.html#Ruby)

安装 Travis 工具只需一条命令

```bash
gem install travis # 或许需要 sudo
```

##### 登录 Travis

> 在 Windows 下使用，**不** 推荐用 Git Bash 来执行 travis，个人使用时遇到了各种神奇bug……

```bash
travis login
```

稍等片刻，就会提示输入用户名和密码

---

> 网上提供的多是 **非Windows** 系统的加密方法，然而 Windows 系统的 `travis encrypt-file` [并不正常(2018.4.11)](https://github.com/travis-ci/travis-ci/issues/4746)，因此这里采用两种方法

---

##### 非Windows

```bash
travis encrypt-file deploy_rsa --add
```

`--add` 会把解密时需要的命令放到 `before_install` 中，根据需要，可以把这条指令放到其他阶段

##### Windows

由于上面提到的bug，Windows 的操作稍显复杂

```bash
travis encrypt rsa_password=ahduQu9ushou0Roh --add
openssl aes-256-cbc -k "ahduQu9ushou0Roh" -in deploy_rsa -out deploy_rsa.enc
```

> 上面的环境变量名 `rsa_password` 和 密码 `ahduQu9ushou0Roh` 可以自行替换为自定的内容

这样就完成了加密的步骤，然后手动在 `.travis.yml` 中添加解密脚本

```yaml
before_deploy:
- openssl aes-256-cbc -k "$rsa_password" -in deploy_rsa.enc -out deploy_rsa -d
```

这样，travis 在 deploy 阶段前就会解密密钥文件。

至此，完成了 **配置ssh密钥** 的阶段

### 使用ssh密钥

在上面的步骤中，我们已经可以解密出私钥了，那么接下来要用私钥建立ssh连接

修改 `.travis.yml`，加入以下的行

```yaml
addons:
  ssh_known_hosts: <deploy-host>

before_deploy:
- openssl aes-256-cbc -K $encrypted_<...>_key -iv $encrypted_<...>_iv -in deploy_rsa.enc -out /tmp/deploy_rsa -d
- eval "$(ssh-agent -s)"
- chmod 600 /tmp/deploy_rsa
- ssh-add /tmp/deploy_rsa
```

+ `<deploy-host>` 即远程服务器的地址
+ 要注意 `openssl` 解密的一行中，要把 `-out` 后的路径改为 `/tmp/deploy_rsa` (把解密后的私钥放到 `/tmp`，防止把明文私钥部署到其他地方)
+ 使用 `travis encrypt-file xxxx --add` 时，`openssl` 解密会被生成在 `before_install` 中，此处把它放到 `before_deploy` 中，是因为 `before_deploy` 是在确定 **成功** 完成了 install/script 的两个阶段才会执行的，而我们的需求也应该是，前两个阶段完成才有必要解密文件

### 编写部署脚本

你可还记得有一种比较特别的 `deploy provider` 叫做 [`script`](#deploy-script) ？

这里我们就用它来实现部署。

修改 `.travis.yml`

```yaml
deploy:
  provider: script
  skip_cleanup: true
  script: bash deploy.sh
  on:
    branch: master
```

> 上面的意思，可以参阅本文的前半部分

显然，我们还需要编写 `deploy.sh`

```bash
# file: deploy.sh
ssh travis@daddytrapc.cn << 'ENDSSH'
  # Here starts the script in the remote machine
  cd /home/travis
  git clone https://github.com/DaddyTrap/learngit.git
  cd learngit
  echo "`date` - Deploy script running..." >> travis.log
  # Do something here
  python3 test.py
  echo "`date` - Deploy script done!" >> travis.log
ENDSSH
```

根据不同的项目部署方法，只要改写 `'ENDSSH'` 和 `ENDSSH` **之间的**部分即可

---

到这里，就可以 `git add/commit/push`，然后 BOOM，就可以在 https://travis-ci.org/ 看到你的构建过程了

—— 然而，**切记**，**不要** add 私钥文件，如果你真的不小心做了这样的事情，那就重新生成一份吧！
> 你只需要add `deploy_rsa.enc`，而至于私钥文件和公钥文件，在配置好之后就可以都删掉了

## 后记

为了能自动部署到远程的服务器，还是挺折腾的，为此我还经历了多次尝试性的commit呢……

![](/assets/travis_ci_tutorial/commit-log.png)

但是自动部署还是一件很能提高开发效率的事情，所以也不妨折腾折腾吧！