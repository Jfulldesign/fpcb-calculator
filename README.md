# FPCB Calculators

This repository contains a React app and a WordPress plugin that allow users to explore the costs associated with opening a Florida Prepaid savings account. There are several scripts provided in the `package.json`:

| Command        | Description                 |
| -------------- | --------------------------- |
| `yarn start`   | **Start a local server**    |
| `yarn test`    | Unit tests                  |
| `yarn flow`    | Type tests                  |
| `yarn lint`    | Lint assets                 |
| `yarn format`  | Asset formatter             |
| `yarn analyze` | Run the bundle analyzer     |
| `yarn build`   | Build production assets     |
| `yarn package` | Package as WordPress plugin |

### Staging Server

To deploy changes to calculator to the staging server, you will need to get the most commits for [my-florida-prepaid](https://github.com/sjpdigital/my-florida-prepaid)

Complete the `yarn build` and `yarn package` functions on your local repo. This will create files in the fpcb-calculators⁩/dist folder of this repo.

Manually copy the files from your local fpcb-calculators⁩/dist to your local Git repo for my-florida-prepaid in the folder /wp-content⁩/plugins⁩/fpcb-calculators⁩. Make sure to delete previous contents in the plugins/fpcb-calculators.

Commit changes to the my-florida-prepaid repo, then push to staging as normal for that repo via
`$ git push staging master`
