// ----------------------------------------------------------------------------
// TypeScript playground: add TS code here...
// ----------------------------------------------------------------------------

console.log('Hello TS playground!')

let userIdElement: HTMLElement | null = null
let userNameElement: HTMLElement | null = null
let userPostsElement: HTMLElement | null = null
let userAdressElement: HTMLElement | null = null
let userCompanyElement: HTMLElement | null = null
let selectedPost: HTMLLIElement | null = null
let postCommentsElement: HTMLElement | null = null

//#region types

type User = {
  id: number
  name: string
  address: Address
  email: string
  company: Company
}

type Address = {
  suite: string
  street: string
  city: string
  zipcode: string
}

type Company = {
  name: string
  catchPhrase: string
}

type Posts = Post[]

type Post = {
  userId: number
  id: number
  title: string
  body: string
}

type Comments = Comment[]

type Comment = {
  postId: number
  id: number
  name: string
  email: string
  body: string
}
//#endregion

//#region fetch functions

async function fetchUser(id: number): Promise<User | undefined> {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    if (response.status !== 200) {
      console.warn(`user ${id} does not exist`)
      return undefined
    }
    return await response.json()
  } catch (error) {
    console.error(`failed to request user`, error)
    return undefined
  }
}

async function fetchPosts(userId: number): Promise<Posts> {
  // catch the possible internet/url errors
  try {
    // request the API, wait for the response then store it
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)

    // check if the request succeeds (here, the status is returned by the API)
    if (response.status !== 200) {
      console.warn(`post ${userId} does not exist`)
      return []
    }

    // extract the data from response
    const res = await response.json()

    // return an empty array if data response does not contain an array
    if (!Array.isArray(res)) {
      console.warn(`post response is not an array`)
      return []
    }

    return res
  } catch (error) {
    console.error(`failed to request user`, error)
    return []
  }
}

async function fetchComments(postId: number): Promise<Comments> {
  // catch the possible internet/url errors
  try {
    // request the API, wait for the response then store it
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)

    // check if the request succeeds (here, the status is returned by the API)
    if (response.status !== 200) {
      console.warn(`comments for post ${postId} don't exist`)
      return []
    }

    // extract the data from response
    const res = await response.json()

    // return an empty array if data response does not contain an array
    if (!Array.isArray(res)) {
      console.warn(`comments response is not an array`)
      return []
    }
    return res
  } catch (error) {
    console.error(`failed to  request user`, error)
    return []
  }
}
//#endregion

//#region html functions

function initialization() {
  userIdElement = document.getElementById('user-id')
  userNameElement = document.getElementById('user-name')
  userPostsElement = document.getElementById('user-posts')
  userAdressElement = document.getElementById('user-address')
  userCompanyElement = document.getElementById('user-company')
  postCommentsElement = document.getElementById('post-comments')

  // add onclick event to btn-up
  const btnUp = document.getElementById('btn-up')
  if (btnUp instanceof HTMLButtonElement) {
    btnUp.addEventListener('click', incrementUser)
  }

  // add onclick event to btn-down
  const btnDown = document.getElementById('btn-down')
  if (btnDown instanceof HTMLButtonElement) {
    btnDown.addEventListener('click', decrementUser)
  }
}

function incrementUser() {
  userId++
  setUserId()
}

function decrementUser() {
  userId--
  setUserId()
}

/**
 * set the user id, then fetch and display the user and hes posts
 */
async function setUserId() {
  displayUserId()
  await refreshUserDetails()
}

//#endregion

//#region display functions

function displayUserId() {
  if (userIdElement instanceof HTMLLabelElement) {
    userIdElement.innerText = userId.toString()
  }
}

function displayUser(user: User | undefined) {
  if (userNameElement instanceof HTMLLabelElement) {
    userNameElement.innerText = user?.name ?? 'null'
  }
  if (userAdressElement instanceof HTMLLabelElement) {
    userAdressElement.innerText = address(user?.address)
  }
  if (userCompanyElement instanceof HTMLLabelElement) {
    userCompanyElement.innerText = company(user?.company)
  }
}

function displayPosts(posts: Posts) {
  if (userPostsElement instanceof HTMLUListElement) {
    // remove existing <li> form the <ul>
    userPostsElement.innerHTML = ''
    displayComments([])

    // add posts as <li> into the <ul>
    for (const post of posts) {
      const li = document.createElement('li')
      li.classList.add('user-post-hover')

      if (li instanceof HTMLLIElement) {
        li.innerText = `${post.id}: ${post.title}`
        li.dataset.postId = post.id.toString()

        // change <li> style when selected
        li.addEventListener('click', () => {
          // remove previous post selection
          if (selectedPost !== null) {
            selectedPost.classList.remove('user-post-select')
          }

          // store new post selected
          selectedPost = li

          // set post selection
          li.classList.add('user-post-select')

          // fetch and display comments
          const sid = li.dataset.postId ?? '0'
          const id = Number.parseInt(sid, 10)
          refreshComments(id)
        })
      }
      userPostsElement.appendChild(li)
    }
  }
}

function displayComments(comments: Comments) {
  if (postCommentsElement instanceof HTMLUListElement) {
    postCommentsElement.innerHTML = ''
    for (const comment of comments) {
      const li = document.createElement('li')
      if (li instanceof HTMLLIElement) {
        li.innerText = `${comment.id}, from ${comment.email} : ${comment.body}`
      }
      postCommentsElement.appendChild(li)
    }
  }
}

//#endregion

//#region refresh (fetch + display) functions

async function refreshComments(postId: number) {
  // fetch comments
  const comments = await fetchComments(postId)

  // display comments
  displayComments(comments)
}

/**
 * fetch and display the user and hes posts
 */
async function refreshUserDetails() {
  // fetch and display user
  const user = await fetchUser(userId)
  displayUser(user)

  // fetch and display user's posts
  if (user !== undefined) {
    const posts = await fetchPosts(userId)
    displayPosts(posts)
  } else {
    displayPosts([])
  }
}

//#endregion

function address(address: Address | undefined): string {
  if (address === undefined) {
    return 'address unknown'
  }
  return `${address.suite}, ${address.street}, ${address.zipcode} ${address.city} `
}

function company(company: Company | undefined): string {
  if (company === undefined) {
    return 'company unknown'
  }
  return `${company.name}, '${company.catchPhrase}'`
}

let userId = 1

initialization()
displayUserId()
refreshUserDetails()
