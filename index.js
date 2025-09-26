const { Probot } = require("probot");

module.exports = (app) => {
    console.log("App is loaded");

    app.on(["pull_request.opened", "pull_request.synchronize"], async (context) => {
        const pr = context.payload.pull_request;

        console.log(pr);

        if (pr.user.login !== "renovate[bot]") {
            return;
        }

        await context.octokit.pulls.createReview({
            owner: context.repo.owner,
            repo: context.repo.repo,
            pull_number: pr.number,
            event: "APPROVE"
        });
    });
};
