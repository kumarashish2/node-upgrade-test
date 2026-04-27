// ── Configuration ────────────────────────────────────────────────────
const GITHUB_TOKEN = "";
const TARGET_BRANCH = "dev";

const REPOS = [
  "https://github.com/EliLillyCo/ewi-ebglyss-aem-us",
];
// ─────────────────────────────────────────────────────────────────────

function extractOwnerRepo(input) {
  return input.replace(/^https?:\/\/github\.com\//, "").replace(/\/$/, "");
}

async function changeDefaultBranch(repo) {
  repo = extractOwnerRepo(repo);
  const res = await fetch(`https://api.github.com/repos/${repo}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ default_branch: TARGET_BRANCH }),
  });

  const body = await res.json();

  if (res.ok) {
    console.log(`   ✓ Success (was "${body.default_branch}")`);
    return true;
  }

  console.log(`   ✗ Failed (HTTP ${res.status}) ${body.message}`);
  return false;
}

async function main() {
  if (GITHUB_TOKEN === "YOUR_GITHUB_TOKEN_HERE") {
    console.error("Error: Set GITHUB_TOKEN before running.");
    process.exit(1);
  }

  let success = 0;
  let failed = 0;

  for (const repo of REPOS) {
    console.log(`── Updating ${repo} → default branch: ${TARGET_BRANCH}`);
    const ok = await changeDefaultBranch(repo);
    ok ? success++ : failed++;
  }

  console.log(`\n── Done: ${success} succeeded, ${failed} failed (out of ${REPOS.length} repos)`);
}

main();
