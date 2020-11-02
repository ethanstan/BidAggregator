<script>
    import { query } from "svelte-apollo";
    import gql from "graphql-tag";
    import { params } from '@sveltech/routify';
    import { url } from '@sveltech/routify'

    let agencyId = $params.id;
  
    const GET_AGENCY = gql`
    query MyQuery($agencyId: ID!) {
        getAgency(id: $agencyId) {
            name
            location
            bids {
                title
                id
                added
            }
            contacts {
                name
                id
            }
        }
    }
      `
  
    const agency = query(GET_AGENCY, {
      variables: { agencyId },
    });
  </script>
  
  <div class="min-h-screen">
    <div class="bg-unitdark-900 pb-4">
      <nav class="bg-unitdark-900 py-2 border-b-2 border-unitdark-700">
          <div class="max-w-full mx-auto sm:px-6 lg:px-12 ">
            <div class="">
              <div class="flex items-center h-16 px-4 sm:px-0 ">
                <div class="flex items-center w-full">
                  <a href="/" class="text-white text-lg font-mono flex mx-auto">
                    Bid Aggregator
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      <header class="py-10 px-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
            <button on:click={()=>{window.history.back();}}>
                <svg class="text-white h-12 w-12 my-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
            </button>
          {#if $agency.data}
              <h1 class="text-5xl leading-9 font-bold text-white mt-10">
              {$agency.data.getAgency.name}
              </h1>
              <span class="mt-5 inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium leading-5 bg-indigo-100 text-indigo-800">
                Agency
              </span>
          {/if}
        </div>
      </header>
    </div>
      {#if $agency.loading}
      <div class="bg-unitdark-900 min-h-screen text-white text-center">Loading...</div>
      {:else if $agency.error}
      <li>ERROR: {$agency.error.message}</li>
      {:else if $agency.data}
      <main class="bg-unitdark-900">
          <div class="bg-unitdark-700 shadow overflow-hidden sm:rounded-lg">
              <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 class="text-lg leading-6 font-medium text-gray-300 text-left">
                  {$agency.data.getAgency.name}
              </h3>
              </div>
              <div class="px-4 py-5 sm:px-6 text-left">
              <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div class="sm:col-span-2">
                  <dt class="text-sm leading-5 font-medium text-gray-100">
                      Location
                  </dt>
                  <dd class="mt-1 text-sm leading-5 text-gray-300">
                      {$agency.data.getAgency.location}
                  </dd>
                  </div>
                  
                  <div class="sm:col-span-2">
                      <dt class="text-sm leading-5 font-medium text-gray-100">
                          Bids
                      </dt>
                      <dd class="mt-1 text-sm leading-5 text-gray-300">
                          <ul class="border border-gray-200 rounded-md">
                          {#each $agency.data.getAgency.bids as bid}
                          <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm leading-5">
                              <div class="w-0 flex-1 flex items-center">
                              <svg class="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <span class="ml-2 flex-1 w-0 truncate">
                                  {bid.title}
                              </span>
                              </div>
                              <div class="ml-4 flex-shrink-0">
                              <a href="{$url('/bids/:id', {id: bid.id})}" class="font-medium text-unit-600 transition duration-150 ease-in-out">
                                  View
                              </a>
                              </div>
                          </li>
                          {/each}
                          </ul>
                      </dd>
                  </div>

                  <div class="sm:col-span-2">
                    <dt class="text-sm leading-5 font-medium text-gray-100">
                        Contacts
                    </dt>
                    <dd class="mt-1 text-sm leading-5 text-gray-300">
                        <ul class="border border-gray-200 rounded-md">
                        {#each $agency.data.getAgency.contacts as contact}
                        <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm leading-5">
                            <div class="w-0 flex-1 flex items-center">
                            <svg class="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span class="ml-2 flex-1 w-0 truncate">
                                {contact.name}
                            </span>
                            </div>
                            <div class="ml-4 flex-shrink-0">
                            <a href="{$url('/contacts/:id', {id: contact.id})}" class="font-medium text-unit-600 transition duration-150 ease-in-out">
                                View
                            </a>
                            </div>
                        </li>
                        {/each}
                        </ul>
                    </dd>
                </div>
  
              </dl>
              </div>
          </div>
  
  
      </main>
      {:else}
      <li>Bid not found</li>
      {/if}
  
  </div>
  
  