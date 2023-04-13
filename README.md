# medusa-imgur

Use [Imgur](https://imgur.com/) as a filservice for medusajs

Imgur’s API exposes the entire Imgur infrastructure via a standardized programmatic interface. Using Imgur’s API, you can do just about anything you can do on imgur.com

## Install

Run the bellow command and follwo the instructions

`npm i medusa-imgur`

## Useage

First of all we need your `clientId` nad `clientSecret` to obtain them you should

* [Register an Imgur account](https://imgur.com/register)
* [Create an application](https://api.imgur.com/#registerapp)

And then in the `medusa-config.js` add the plugin and credentials.

```Typescript
const plugins = [
  // ...
  {
    resolve: `medusa-imgur`,
    options: {
      clientId: string,
      clientSecret: string,
    },
  },
]
```

Thats it enjoy it ⭐
