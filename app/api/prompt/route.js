import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

function getURLParameters(url) {
  var params = {};
  var urlParts = url.split("?");
  if (urlParts.length > 1) {
    var queryString = urlParts[1];
    var pairs = queryString.split("&");
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split("=");
      var key = decodeURIComponent(pair[0]);
      var value = decodeURIComponent(pair[1] || "");
      params[key] = value;
    }
  }
  return params;
}

export const GET = async (request) => {
  try {
    await connectToDB();

    let { page, pageSize } = getURLParameters(request?.url);
    pageSize = Number(pageSize);
    const skip = (page - 1) * pageSize;
    const totalPromptsCount = await Prompt.countDocuments({});
    const hasMore = (skip + pageSize) < totalPromptsCount;

    const prompts = await Prompt.find({})
      .skip(skip)
      .limit(pageSize)
      .populate("creator");

    return new Response(JSON.stringify({prompts, hasMore}), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
