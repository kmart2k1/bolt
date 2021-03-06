const { App } = require('@slack/bolt')

const app = new App({
	token: process.env.SLACK_BOT_TOKEN,
	signingSecret: process.env.SLACK_SIGNING_SECRET
  });
  
  (async () => {
	// Start your app
	await app.start(process.env.PORT || 80);
  
	console.log('⚡️ Bolt app is running on port ' + process.env.PORT);
  })();

  app.event('app_home_opened', async ({ event, context }) => {
	try {
	  /* view.publish is the method that your app uses to push a view to the Home tab */
	  const result = await app.client.views.publish({
  
		/* retrieves your xoxb token from context */
		token: context.botToken,
  
		/* the user that opened your app's app home */
		user_id: event.user,
  
		/* the view payload that appears in the app home*/
		view: {
		  type: 'home',
		  callback_id: 'home_view',
  
		  
		  /* body of the view */
		  blocks: [
			{
			  "type": "section",
			  "text": {
				"type": "mrkdwn",
				"text": "*DND* :tada:"
			  }
			},
			{
			  "type": "divider"
			},
			{
			  "type": "section",
			  "text": {
				"type": "mrkdwn",
				"text": "This button won't do much for now but you can set up a listener for it using the `actions()` method and passing its unique `action_id`. See an example in the `examples` folder within your Bolt app."
			  }
			},
			{
			  "type": "actions",
			  "elements": [
				{
				  "type": "button",
				  "text": {
					"type": "plain_text",
					"text": "Click me!"
				  }
				}
			  ]
			}
		  ]
		}
	  });
	}
	catch (error) {
	  console.error(error);
	}
  });